/*
  Warnings:

  - A unique constraint covering the columns `[date,binary_id,user_id]` on the table `StrategyBinaryPay` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `StrategyBinaryPay_date_binary_id_user_id_key` ON `StrategyBinaryPay`(`date`, `binary_id`, `user_id`);
