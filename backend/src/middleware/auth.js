const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const header = req.header('Authorization');
  if (!header) 
    return res.status(401).json({ 
  success: false, 
  message: 'No token, authorization denied' 
});

  const token = header.split(' ')[1];
  if (!token) 
    return res.status(401).json({ 
  success: false, 
  message: 'Malformed token' 
});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token is not valid' 
    });
  }
};
