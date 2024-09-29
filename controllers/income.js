const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addIncome = async (req, res) => {
    const { title, amount: a, category, description, date } = req.body;

    // Convert amount to a number (integer or float depending on your requirements)
    const amount = parseFloat(a);

    // Validations
    if (!title || !category || !description || !date) {
        return res.status(400).json({ message: 'All fields are required!' });
    }
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: 'Amount must be a positive number!' });
    }

    try {
        // Create a new income record using Prisma
        const newIncome = await prisma.income.create({
            data: {
                title,
                amount,
                category,
                description,
                date: new Date(date),
            },
        });
        
        res.status(200).json({ message: 'Income Added', income: newIncome });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
    
    // console.log(newIncome);
};

exports.getIncomes = async (req, res) => {
    try {
        // Fetch all incomes sorted by creation date (newest first)
        const incomes = await prisma.income.findMany({
            orderBy: { createdAt: 'desc' },
        });

        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the income by ID using Prisma
        await prisma.income.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
