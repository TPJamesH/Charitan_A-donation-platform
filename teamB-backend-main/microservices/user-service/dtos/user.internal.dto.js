class UserInternalDTO {
  constructor({
    id,
    username,
    email,
    hashedPassword,
    role,
    refreshToken,
    otp,
    otpExpiry,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.role = role;
    this.refreshToken = refreshToken;
    this.otp = otp;
    this.otpExpiry = otpExpiry;
  }
}
module.exports = UserInternalDTO;
