/*
  Warnings:

  - The values [LeftStrategyBinary] on the enum `strategy_binary_pay_direction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `strategy_binary_pay` MODIFY `direction` ENUM('NONE', 'LEFT', 'RIGHT') NOT NULL DEFAULT 'NONE';
