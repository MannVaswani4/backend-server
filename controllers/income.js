const incomeService = require('../service/incomeService');

// Add a new income
exports.addIncome = async (req, res) => {
    const { userId, title, amount, category, description, date } = req.body;

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        // Use Prisma to create a new income
        const newIncome = await incomeService.createIncome({
            userId,
            title,
            amount,
            category,
            description,
            date
        });

        res.status(200).json({ message: 'Income Added', income: newIncome });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all incomes
exports.getIncomes = async (req, res) => {
    try {
        // Use Prisma to fetch all incomes
        const incomes = await incomeService.getAllIncomes();
        res.status(200).json(incomes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete income by ID
exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        // Use Prisma to delete income by ID
        await incomeService.deleteIncome(id);
        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const { id } = req.params;
    try {
       
        const newExpense = await incomeService.updateIncome(id, {
            title,
            amount,
            category,
            description,
            date
        });

        res.status(200).json({ message: 'Income Updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}