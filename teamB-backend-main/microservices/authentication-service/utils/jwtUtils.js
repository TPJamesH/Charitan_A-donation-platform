const jwt = require('jsonwebtoken');
const {CompactEncrypt, SignJWT, importSPKI} = require('jose');
const dotenv = require('dotenv');
const crypto = require('crypto')
dotenv.config();
const { createPublicKey, createPrivateKey } = require('crypto');

const generateAccessToken = async (payload) => {
    const signedAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_SECRET, {algorithm: 'RS256', expiresIn: '30m' });

      // Convert PEM string to KeyObject
    const publicKey = createPublicKey(process.env.ENCRYPT_PUBLIC_TOKEN);

    const jwe = await new CompactEncrypt(Buffer.from(JSON.stringify({ jws: signedAccessToken })))
    .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' })
    .encrypt(publicKey); // Encypt with public key
    return jwe.toString();
  };
  
  /**
   * Generate a long-lived refresh token
   * @param {Object} payload - The payload to encode in the token
   * @returns {string} The signed refresh token
   */
const generateRefreshToken = async (payload) => {
    const signedRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

            // Convert PEM string to KeyObject
    const publicKey = createPublicKey(process.env.ENCRYPT_PUBLIC_TOKEN);

    const jwe = await new CompactEncrypt(Buffer.from(JSON.stringify({ jws: signedRefreshToken })))
    .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' })
    .encrypt(publicKey); // Encypt with public key
    return jwe;
  };


const setAccesstokenCookies = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 30 * 60 * 1000, // 30 minutes
});
};

const setTokensInCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 60 * 1000, // 30 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  };

  const decrypt = async (encryptData) =>{

    const buffer = Buffer.from(encryptData, 'base64'); //buffer for base64 decoder
    const decrypted = crypto.privateDecrypt(
      {
        key: process.env.ENCRYPT_PRIVATE_TOKEN,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      buffer
    )
  
    console.log(decrypted.toString())
    return decrypted.toString()
  }

module.exports = {
  generateAccessToken: generateAccessToken,
  generateRefreshToken: generateRefreshToken,
  setAccesstokenCookies: setAccesstokenCookies,
  setTokensInCookies: setTokensInCookies,
  decryptWare: decrypt


};