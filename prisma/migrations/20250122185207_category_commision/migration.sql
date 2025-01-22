-- CreateTable
CREATE TABLE `withdraw` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `amount` DECIMAL(20, 8) NOT NULL,
    `status` ENUM('PENDING', 'PAYED', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    `balance_history_id` INTEGER NULL,
    `commission_order_id` BIGINT UNSIGNED NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `withdraw` ADD CONSTRAINT `withdraw_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `withdraw` ADD CONSTRAINT `withdraw_balance_history_id_fkey` FOREIGN KEY (`balance_history_id`) REFERENCES `balance_history`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `withdraw` ADD CONSTRAINT `withdraw_commission_order_id_fkey` FOREIGN KEY (`commission_order_id`) REFERENCES `commission_order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
