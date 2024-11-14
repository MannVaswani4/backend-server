const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new income record
async function createIncome(data) {
  console.log(data);
  return await prisma.income.create({
    data: {
      userId: data.userId,
      title: data.title,
      amount: data.amount,
      type: data.type || "income", 
      date: new Date(data.date),
      category: data.category,
      description: data.description
    }
  });
}

// Get all incomes
async function getAllIncomes() {
  return await prisma.income.findMany();
}

// Get income by ID
async function getIncomeById(id) {
  return await prisma.income.findUnique({
    where: { id: parseInt(id) }
  });
}

// Update income by ID
async function updateIncome(id, data) {
  return await prisma.income.update({
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

// Delete income by ID
async function deleteIncome(id) {
  return await prisma.income.delete({
    where: { id: parseInt(id) }
  });
}

module.exports = {
  createIncome,
  getAllIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome
};
