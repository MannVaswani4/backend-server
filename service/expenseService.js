const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new expense
async function createExpense(data) {
  return await prisma.expense.create({
    data: {
      userId: data.userId,
      title: data.title,
      amount: data.amount,
      type: data.type || "expense", 
      date: new Date(data.date),
      category: data.category,
      description: data.description
    }
  });
}

// Get all expenses
async function getAllExpenses() {
  return await prisma.expense.findMany();
}

// Get expense by ID
async function getExpenseById(id) {
  return await prisma.expense.findUnique({
    where: { id: parseInt(id) }
  });
}

// Update expense by ID
async function updateExpense(id, data) {
  return await prisma.expense.update({
    where: { id: parseInt(id) },
    data: {
      title: data.title,
      amount: data.amount,
      type: data.type,
      date: new Date(data.date),
      category: data.category,
      description: data.description
    }
  });
}

// Delete expense by ID
async function deleteExpense(id) {
  return await prisma.expense.delete({
    where: { id: parseInt(id) }
  });
}

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
};
