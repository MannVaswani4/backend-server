const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addExpense = async (req, res) => {
    const { title, amount:a, category, description, date } = req.body;

    // Validations
    if (!title || !category || !description || !date) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    if (a <= 0) {
        return res.status(400).json({ message: 'Amount must be a positive number!' });
    }
    if(a){
        var amount = parseInt(a);
    }

    try {
        // Create a new expense using Prisma
        const newExpense = await prisma.expense.create({
            data: {
                title,
                amount,
                category,
                description,
                date: new Date(date),
            },
        });
        
        res.status(200).json({ message: 'Expense Added', expense: newExpense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getExpense = async (req, res) => {
    try {
        // Fetch all expenses sorted by creation date (newest first)
        const expenses = await prisma.expense.findMany({
            orderBy: { createdAt: 'desc' },
        });

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the expense by ID using Prisma
        await prisma.expense.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
