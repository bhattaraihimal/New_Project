
const crypto = require('crypto');

// Function to generate a random secret key 
const generateSecretKey = (length) => {
    return crypto.randomBytes(length).toString('hex');
};

// Generate a 32-character random secret key
const secretKey = generateSecretKey(32); 

console.log('Generated Secret Key:', secretKey);
