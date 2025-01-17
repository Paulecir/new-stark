/*
  Warnings:

  - Added the required column `points` to the `StrategyBinaryPay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StrategyBinaryPay` ADD COLUMN `points` DECIMAL(20, 8) NOT NULL;
