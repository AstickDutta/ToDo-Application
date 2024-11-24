const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

const generateToken = (userId) => {
  const payload = {
    id: userId,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

  return token;
};

module.exports = generateToken;
