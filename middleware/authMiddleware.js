
const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'mann2607');
    req.user = decoded; // Attach the user id from the token
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
