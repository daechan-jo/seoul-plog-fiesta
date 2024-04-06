import jwt from 'jsonwebtoken';

export function generateToken(
  payload: object,
  secretKey: string,
  expiresIn: string,
) {
  return jwt.sign(payload, secretKey, {
    expiresIn,
    issuer: 'Pineapple Pizza',
  });
}
