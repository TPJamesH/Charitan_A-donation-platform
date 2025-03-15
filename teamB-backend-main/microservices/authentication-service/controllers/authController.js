const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwtUtils.js");
//const UserRepository = require('../repository/user.repository.js');
const UserService = require("../services/user.service.js");
const crypto = require("crypto");
const { jwtDecrypt } = require("jose");
const { createPrivateKey } = require("crypto");
const EmailService = require("../utils/email/emailService.js");

exports.login = async (req, res) => {
  const { email, password } = req.decryptedCredentials;
  try {
    const user = await UserService.findByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json({ error: "No user found, invalid credential" });
    }
    // Check for email activated or not
    if (user.isActive != true) {
      return res.status(403).json({ error: "Account email is not activated" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const accessToken = await jwtUtils.generateAccessToken({
      userId: user._id,
      userRole: user.role,
    });
    const refreshToken = await jwtUtils.generateRefreshToken({
      userId: user._id,
      userRole: user.role,
    });
    jwtUtils.setTokensInCookies(res, accessToken, refreshToken);
    // Save refreshtoken
    await UserService.update(user._id, { refreshToken });

    return res.status(200).json({ message: "Login successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

exports.register = async (req, res) => {
  const { email, username, role } = req.body;
  try {
    // Check if username already exists
    let existingUser = await UserService.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // Check if email already exists
    existingUser = await UserService.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (role === "Admin") {
      return res
        .status(401)
        .json({ message: "Unauthorize, can't register Admin" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    // CHANGE this LATER
    //const otp = "123456";
    const hashedOTP = await bcrypt.hash(otp, 10);
    const otpExpiry = Date.now() + 1 * 60 * 1000; // OTP valid for 10 minutes

    // Send email
    await EmailService.sendVerifyEmail(email, username, otp);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user with the hashed password
    const user = UserService.create({
      ...req.body,
      isActive: false,
      hashedPassword: hashedPassword,
      otp: hashedOTP,
      otpExpiry: otpExpiry,
    });

    return res
      .status(200)
      .json({ message: "Register successfully, email sent" });
  } catch (error) {
    console.log("Can't push new user");
    return res.status(500).json({ message: error.message });
  }
};

exports.refresh = async (req, res) => {
  let refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  const user = await UserService.findByRefreshToken(refreshToken);
  const privateKey = createPrivateKey(process.env.ENCRYPT_PRIVATE_TOKEN);
  const decrypted = await jwtDecrypt(refreshToken, privateKey);
  refreshToken = decrypted.payload.jws;

  // Reuse refreshToken case
  if (!user) {
    console.log("invalid refreshToken");
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json("Invalid refreshToken");
        }

        try {
          const _id = decoded.userId;
          const compromisedUser = await UserService.findById({ _id });
          if (compromisedUser) {
            refreshToken = "";
            // Remove refreshToken, force to login again after accessToken expired
            await UserService.update(compromisedUser._id, { refreshToken });
            return res.status(500).json({ message: "Reused detected, logout" });
          }
        } catch (error) {
          return res.status(500).json({ message: "Unexpected database error" });
        }
      }
    );
    return;
  }

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const newAccessToken = await jwtUtils.generateAccessToken({
      userId: decodedToken.userId,
      userRole: decodedToken.userRole,
    });
    jwtUtils.setAccesstokenCookies(res, newAccessToken);

    return res.status(200).json({ message: "Access token refreshed" });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token " });
  }
};

// Middleware
exports.verify = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    console.log("no accessToken");
    return res.status(401).json({ message: "Access token not found" });
  }
  try {
    const privateKey = createPrivateKey(process.env.ENCRYPT_PRIVATE_TOKEN);
    const decrypted = await jwtDecrypt(accessToken, privateKey); // jwe decrypt
    const jws = decrypted.payload.jws;

    const decoded = jwt.verify(jws, process.env.ACCESS_TOKEN_PUBLIC_SECRET); // jws verify
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token has expired" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    const user = req.user;
    if (user) {
      await UserService.update(user.userId, { refreshToken: "" });
    }

    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error logging out" });
  }
};

exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  try {
    // Check if email already exists
    const existingUser = await UserService.findByEmail(email);
    if (existingUser.otp && !existingUser.isActive) {
      if (Date.now() > existingUser.otpExpiry) {
        const otp = crypto.randomInt(100000, 999999).toString();
        // CHANGE this LATER
        //const otp = "123456";
        const hashedOTP = await bcrypt.hash(otp, 10);
        const otpExpiry = Date.now() + 1 * 60 * 1000; // OTP valid for 10 minutes

        // Remove OTP and set user to active
        await UserService.update(existingUser._id, {
          otp: hashedOTP,
          otpExpiry: otpExpiry,
        });
        // Send email
        await EmailService.sendVerifyEmail(
          existingUser.email,
          existingUser.username,
          otp
        );

        return res.status(400).send("OTP expired, new OTP sent");
      }

      // Ensure bcrypt.compare is awaited properly
      const isOTPvalid = await bcrypt.compare(otp, existingUser.otp);
      if (!isOTPvalid) {
        return res.status(400).send("Invalid OTP.");
      }

      // Remove OTP and set user to active
      await UserService.update(existingUser._id, { otp: "", isActive: true });
      // Send welcome email
      await EmailService.sendWelcomeEmail(
        existingUser.email,
        existingUser.username,
        existingUser.role
      );

      return res.status(200).json({ message: "Email verified" });
    }
    return res.status(200).json({ message: "Email verified" });
  } catch (error) {
    console.error("Error verifying email:", error); // Log for debugging
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getToken = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({ message: "token not found" });
  }
  res.json({ accessToken });
};

exports.decrypter = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "You are not authenticated" });
  }

  try {
    const decrypted = (await jwtUtils.decryptWare(header.split(" ")[1])).split(
      ":"
    );
    const [email, password] = decrypted;
    req.decryptedCredentials = { email, password };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid Token" });
  }
};
