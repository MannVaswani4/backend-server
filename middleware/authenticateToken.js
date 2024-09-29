const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded; // Attach user info from the token
    next();
  });
};

module.exports = authenticateToken;
