const jwt = require('jsonwebtoken');

function generateToken(payload, secretKey, expiresIn) {
  return jwt.sign(payload, secretKey, {
    expiresIn,
    issuer: 'Pineapple Pizza',
  });
}

export default generateToken;
