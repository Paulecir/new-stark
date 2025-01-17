/*
  Warnings:

  - Made the column `binary_id` on table `StrategyBinaryPay` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `StrategyBinaryPay` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `StrategyBinaryPay` DROP FOREIGN KEY `StrategyBinaryPay_binary_id_fkey`;

-- DropForeignKey
ALTER TABLE `StrategyBinaryPay` DROP FOREIGN KEY `StrategyBinaryPay_user_id_fkey`;

-- DropIndex
DROP INDEX `StrategyBinaryPay_binary_id_fkey` ON `StrategyBinaryPay`;

-- DropIndex
DROP INDEX `StrategyBinaryPay_user_id_fkey` ON `StrategyBinaryPay`;

-- AlterTable
ALTER TABLE `StrategyBinaryPay` MODIFY `binary_id` BIGINT UNSIGNED NOT NULL,
    MODIFY `user_id` BIGINT UNSIGNED NOT NULL;

-- AddForeignKey
ALTER TABLE `StrategyBinaryPay` ADD CONSTRAINT `StrategyBinaryPay_binary_id_fkey` FOREIGN KEY (`binary_id`) REFERENCES `strategy_binary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StrategyBinaryPay` ADD CONSTRAINT `StrategyBinaryPay_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
