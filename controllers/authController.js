// controllers/authController.js

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Signup Controller
const signup = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

    // Respond with user data and token
    res.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal server error during signup' });
  }
};

// Login Controller
const login = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Respond with user data and token
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error during login' });
  }
};

module.exports = {
  signup,
  login,
};
