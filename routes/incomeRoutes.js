// // routes/income.js
// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const prisma = require('../prisma/client'); // Ensure correct path
// const authenticateToken = require('../middleware/authenticateToken');

// const router = express.Router();

// // Add Income
// router.post('/add-income',
//   authenticateToken,
//   [
//     body('title').notEmpty().withMessage('Title is required'),
//     body('amount').isNumeric().withMessage('Amount must be a number'),
//     body('date').isISO8601().withMessage('Date must be a valid date'),
//     body('category').notEmpty().withMessage('Category is required'),
//     body('description').optional().isString(),
//   ],
//   async (req, res) => {
//     // Validate input
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: errors.array()[0].msg });
//     }

//     const { title, amount, date, category, description } = req.body;
//     const userId = req.user.userId;

//     try {
//       const income = await prisma.income.create({
//         data: {
//           title,
//           amount: parseInt(amount, 10),
//           date: new Date(date),
//           category,
//           description,
//           user: { connect: { id: userId } },
//         },
//       });

//       res.status(201).json(income);
//     } catch (error) {
//       console.error('Add Income Error:', error);
//       res.status(500).json({ message: 'Internal server error while adding income' });
//     }
//   }
// );

// // Get Incomes
// router.get('/get-incomes', authenticateToken, async (req, res) => {
//   const userId = req.user.userId;

//   try {
//     const incomes = await prisma.income.findMany({
//       where: { userId },
//       orderBy: { date: 'desc' },
//     });

//     res.status(200).json(incomes);
//   } catch (error) {
//     console.error('Get Incomes Error:', error);
//     res.status(500).json({ message: 'Internal server error while fetching incomes' });
//   }
// });

// // Delete Income
// router.delete('/delete-income/:id', authenticateToken, async (req, res) => {
//   const incomeId = parseInt(req.params.id, 10);
//   const userId = req.user.userId;

//   try {
//     const income = await prisma.income.findUnique({ where: { id: incomeId } });

//     if (!income || income.userId !== userId) {
//       return res.status(404).json({ message: 'Income not found' });
//     }

//     await prisma.income.delete({ where: { id: incomeId } });
//     res.status(200).json({ message: 'Income deleted successfully' });
//   } catch (error) {
//     console.error('Delete Income Error:', error);
//     res.status(500).json({ message: 'Internal server error while deleting income' });
//   }
// });

// module.exports = router;
