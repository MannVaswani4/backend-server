const expenseService = require('../service/expenseService');

// Add a new expense
exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        // Use Prisma to create a new expense
        const newExpense = await expenseService.createExpense({
            title,
            amount,
            category,
            description,
            date
        });

        res.status(200).json({ message: 'Expense Added', expense: newExpense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all expenses
exports.getExpense = async (req, res) => {
    try {
        // Use Prisma to fetch all expenses
        const expenses = await expenseService.getAllExpenses();
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        // Use Prisma to delete an expense by ID
        await expenseService.deleteExpense(id);
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const { id } = req.params;
    try {
       
        const newExpense = await expenseService.updateExpense(id, {
            title,
            amount,
            category,
            description,
            date
        });

        res.status(200).json({ message: 'Expense Updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
