/*
  Warnings:

  - You are about to drop the column `data` on the `StrategyBinaryPay` table. All the data in the column will be lost.
  - Added the required column `date` to the `StrategyBinaryPay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StrategyBinaryPay` DROP COLUMN `data`,
    ADD COLUMN `date` VARCHAR(191) NOT NULL;
