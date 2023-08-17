const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // User Validation
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please Fill All Fields' });
    }

    // Existing User
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ success: false, message: 'User Already Exists' });
    }

    // Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save New User
    const user = await userModel.create({ username, email, password: hashedPassword });

    // Successful Response
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // User Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please Provide Email or Password' });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Email is Not Registered' });
    }
    // Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid Username or Password' });
    }
    // Successful Response
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
