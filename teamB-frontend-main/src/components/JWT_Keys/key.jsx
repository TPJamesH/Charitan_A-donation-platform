import forge from 'node-forge'
//PKCS1 key
const PUBLIC_KEY = `-----BEGIN RSA PUBLIC KEY----- MIIBCgKCAQEAu86BbUb6miEV+XR+AEIi99hKdKQ2FXt0+A0qDTjP3HmbSTilwbDI n1QWLwjz0LlHivubVvCxaSO/lEQFMhEL7uqheZkZebphCZxXxKI9xn1E+aktnxgy L8wC+bBRcSvwuGKbb2bD+Y2Z6NNAukn4c5gSTKiVlOZVHF8LiDZ+dZizGcvipwdw JRDUaDYbVS70doqRtwbaQsPH+OtLvAE19RUW3B2SReJMcnRdrIBAHeDAEMG+LHjR ZtQw5yBl5Kkg4CiYU/SNYSvnXT3iJK1D1vGLMxVJiuRUujkJ2FTK3CDLi2BaambE yjOzYWJ5q8rwuKAHtM6PxV8ZHGVaC8TfOQIDAQAB -----END RSA PUBLIC KEY-----`

//Note: this is necessary because Web Crypto API requires the key in PKCS8 (SPKI) format
function convertPKCSOnetoEight(pem){
    const key = forge.pki.publicKeyFromPem(pem)
    return forge.pki.publicKeyToPem(key)
}

//Remove header and footer first, then decode the base64 input into a binary string, then to an ArrayBuffer
function pemToArray(pem) {
    const b64Lines = pem.split('\n').filter(line => !line.includes('-----'));
    const b64 = b64Lines.join('');
    const binaryString = window.atob(b64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}
//first, get the data, encode it to base64, in the meantime, convert the PKCS, then convert the key into an ArrayBuffer for encryption
async function encryptData(data) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data); //encode data to Uint8 Array
    try {
        const publicKeyPem = convertPKCSOnetoEight(PUBLIC_KEY)
        const publicKeyBuffer = pemToArray(publicKeyPem);
        const cryptoKey = await crypto.subtle.importKey(
            'spki', //format
            publicKeyBuffer,
            { name: 'RSA-OAEP', hash: 'SHA-256' },
            true,
            ['encrypt']
        );
        const encryptedData = await crypto.subtle.encrypt(
            { name: 'RSA-OAEP' },
            cryptoKey,
            encodedData);
        return btoa(String.fromCharCode(...new Uint8Array(encryptedData))); //add an extra layer of base 64 and return
    }
    catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt data');
    };
}

export default encryptData