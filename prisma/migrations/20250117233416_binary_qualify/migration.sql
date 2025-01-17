-- AlterTable
ALTER TABLE `strategy_binary_pay` MODIFY `status` ENUM('PENDING', 'PAYED', 'ERROR', 'NOTQUALIFY') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `users` MODIFY `password` TEXT NOT NULL;
