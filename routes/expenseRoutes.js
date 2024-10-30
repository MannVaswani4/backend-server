const express = require('express');
const router = express.Router();
const expenseService = require('../service/expenseService');

// Create a new expense
router.post('/expenses', async (req, res) => {
  try {
    const newExpense = await expenseService.createExpense(req.body);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to create expense" });
  }
});

// Get all expenses
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve expenses" });
  }
});

// Get an expense by ID
router.get('/expenses/:id', async (req, res) => {
  try {
    const expense = await expenseService.getExpenseById(req.params.id);
    if (expense) {
      res.status(200).json(expense);
    } else {
      res.status(404).json({ error: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve expense" });
  }
});

// Update an expense by ID
router.put('/expenses/:id', async (req, res) => {
  try {
    const updatedExpense = await expenseService.updateExpense(req.params.id, req.body);
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
});

// Delete an expense by ID
router.delete('/expenses/:id', async (req, res) => {
  try {
    await expenseService.deleteExpense(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

module.exports = router;

