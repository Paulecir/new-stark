-- AlterTable
ALTER TABLE `strategy_binary_pay` MODIFY `status` ENUM('PENDING', 'PAYED', 'ERROR') NOT NULL DEFAULT 'PENDING';
