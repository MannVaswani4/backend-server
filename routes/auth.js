// routes/auth.js

const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
// routes/auth.js

const prisma = require('../prisma/client');

const router = express.Router();

// -------------------
// Signup Route
// -------------------
router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  authController.signup
);

// -------------------
// Login Route
// -------------------
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').exists().withMessage('Password is required'),
  ],
  authController.login
);

module.exports = router;
