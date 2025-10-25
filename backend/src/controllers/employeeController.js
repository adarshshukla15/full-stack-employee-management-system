const User = require('../models/User');

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('-password');
    res.status(200).json({ 
      success: true, 
      data: employees 
    });
    } catch (err) { 
    next(err); 
    }
};

