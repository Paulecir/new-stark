-- AlterTable
ALTER TABLE `commission` ADD COLUMN `commission_order_id` BIGINT UNSIGNED NULL,
    MODIFY `status` ENUM('PENDING', 'PAYED', 'CANCEL') NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE `commission_order` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `obs` MEDIUMTEXT NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `total` DECIMAL(20, 8) NOT NULL,
    `status` ENUM('PENDING', 'PAYED', 'CANCEL') NOT NULL DEFAULT 'PENDING',
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `commission_order` ADD CONSTRAINT `commission_order_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commission` ADD CONSTRAINT `commission_commission_order_id_fkey` FOREIGN KEY (`commission_order_id`) REFERENCES `commission_order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commission` ADD CONSTRAINT `commission_scheduler_id_fkey` FOREIGN KEY (`scheduler_id`) REFERENCES `commission_scheduler`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
