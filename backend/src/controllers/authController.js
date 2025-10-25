const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    //fetch data from req.body
    const { name, email, password, role } = req.body;

    //validation
    if (!name || !email || !password) 
      return res.status(400).json({ 
        success: false, 
        message: 'Missing fields' });

    //create user
    let user = await User.findOne({ email });

    //if there is no user then return response
    if (!user) 
      return res.status(400).json({ 
      success: false,   
      message: 'User already exists' 
    });

    //hash the password
    const hashed = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashed, role });
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    //return response
    res.status(201).json({ 
      success: true, 
      data: { token } });
    } catch (err) { 
    next(err); 
    }
};

//login controller
exports.login = async (req, res, next) => {
  try {
    //fetch data from req.body
    const { email, password } = req.body;

    //validation
    if (!email || !password) 
      return res.status(400).json({ 
      success: false, 
      message: 'Missing fields' 
    });

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) 
      return res.status(400).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });

    //match the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
      return res.status(400).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.status(200).json({ 
      success: true, 
      data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } } });
    } catch (err) { 
    next(err); 
    }
};

