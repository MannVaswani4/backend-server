/*
  Warnings:

  - You are about to drop the column `userId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Income` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Expense` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `Income` DROP COLUMN `userId`;
