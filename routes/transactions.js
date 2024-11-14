const { addExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = require('express').Router();


router.post('/add-income',authMiddleware,  addIncome)
    .get('/get-incomes',authMiddleware,  getIncomes)
    .delete('/delete-income/:id',authMiddleware,  deleteIncome)
    .put('/update-income/:id',authMiddleware,  updateIncome)
    .post('/add-expense',authMiddleware,  addExpense)
    .get('/get-expenses',authMiddleware,  getExpense)
    .delete('/delete-expense/:id',authMiddleware, deleteExpense)
    .put('/update-expense/:id',authMiddleware, updateExpense)

module.exports = router