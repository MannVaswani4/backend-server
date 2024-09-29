// app.js

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/authenticateToken');
const errorHandler = require('./middleware/errorHandler'); // Optional for centralized error handling
const { addExpense, getExpense, deleteExpense } = require('./controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('./controllers/income');
const app = express();

// Load environment variables
require('dotenv').config();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // Adjust to your frontend's URL
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.post('/api/v1/add-income', addIncome);
app.get('/api/v1/get-incomes', getIncomes)
app.delete('/api/v1/delete-income/:id', deleteIncome)
app.post('/api/v1/add-expense', addExpense)
app.get('/api/v1/get-expenses', getExpense)
app.delete('/api/v1/delete-expense/:id', deleteExpense)
// Example Protected Route
app.get('/api/v1/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user.userId });
});

// Error Handling Middleware (Optional)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
