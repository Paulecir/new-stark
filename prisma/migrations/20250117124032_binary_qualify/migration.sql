/*
  Warnings:

  - You are about to drop the column `left_point` on the `strategy_binary` table. All the data in the column will be lost.
  - You are about to drop the column `right_point` on the `strategy_binary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `strategy_binary` DROP COLUMN `left_point`,
    DROP COLUMN `right_point`;
