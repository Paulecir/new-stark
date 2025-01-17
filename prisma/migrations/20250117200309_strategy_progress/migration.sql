/*
  Warnings:

  - Made the column `direction` on table `strategy_binary_pay` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `strategy_binary_pay` MODIFY `direction` ENUM('NONE', 'LeftStrategyBinary', 'RIGHT') NOT NULL DEFAULT 'NONE';
