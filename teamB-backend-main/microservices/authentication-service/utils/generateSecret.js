const crypto = require('crypto');

// Generate a secure random secret
const accessTokenSecret = crypto.randomBytes(32).toString('hex');
const refreshTokenSecret = crypto.randomBytes(40).toString('hex');
console.log('Access Token Secret:', accessTokenSecret);
console.log('Refresh Token Secret:', refreshTokenSecret);

// Generate key pair
crypto.generateKeyPair('rsa', {
  modulusLength: 2048, // Key size in bits
  publicKeyEncoding: {
    type: 'spki',      // Public Key Cryptography Standards (PKCS#1)
    format: 'pem',     // PEM format
  },
  privateKeyEncoding: {
    type: 'pkcs8',     // Private-Key Cryptography Standards
    format: 'pem',     // PEM format
  },
}, (err, publicKey, privateKey) => {
  if (err) {
    return console.error('Error generating key pair:', err);
  }

  // Save the keys to files
  console.log(privateKey);
  console.log(publicKey);

  console.log('Key pair generated successfully!');
});

const { publicKey, privateKey } = await generateKeyPair('RSA-OAEP', {
  modulusLength: 2048,
});
console.log(publicKey, privateKey);