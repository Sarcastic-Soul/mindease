import jwt from 'jsonwebtoken';
export async function generateToken(email) {
    const secretKey = process.env.TOKEN_SECRET;
    const payload = { email };
    // Create a token with a short expiration time (e.g., 15 minutes)
    return jwt.sign(payload, secretKey, { expiresIn: '15m' });
}