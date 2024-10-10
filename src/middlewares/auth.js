const jwt = require('jsonwebtoken');

exports.auth = (role) => (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== role) return res.status(403).json({ message: 'Forbidden' });
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
