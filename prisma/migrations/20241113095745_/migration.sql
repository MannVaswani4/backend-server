/*
  Warnings:

  - Added the required column `userId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Expense` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Income` ADD COLUMN `userId` INTEGER NOT NULL;
