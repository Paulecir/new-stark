-- AlterTable
ALTER TABLE `order` ADD COLUMN `payment_by_id` BIGINT UNSIGNED NULL;

-- AlterTable
ALTER TABLE `withdraw` MODIFY `status` ENUM('PENDING', 'SCHEDULER', 'PAYED', 'REJECT', 'CANCELED') NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_payment_by_id_fkey` FOREIGN KEY (`payment_by_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
