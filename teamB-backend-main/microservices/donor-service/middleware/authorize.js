const { jwtDecrypt } = require("jose");
const { createPrivateKey } = require("crypto");
const jwt = require("jsonwebtoken");
// Middleware
const verify = (role) => {
  return async (req, res, next) => {
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

      if (role === "Admin") {
        if (decoded.userRole === "Admin") {
          next();
        } else {
          return res.status(403).json({ message: "Access Denied" });
        }
      }
      if (role === "Normal") {
        next();
      }
    } catch (error) {
      console.log(error);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = { verify };
