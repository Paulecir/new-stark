-- AlterTable
ALTER TABLE `strategy_binary` ADD COLUMN `qualify` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `StrategyBinaryPay` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `data` VARCHAR(191) NOT NULL,
    `binary_id` BIGINT UNSIGNED NULL,
    `user_id` BIGINT UNSIGNED NULL,
    `amount` DECIMAL(20, 8) NOT NULL,
    `qualify` BOOLEAN NOT NULL DEFAULT false,
    `mirror` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StrategyBinaryPay` ADD CONSTRAINT `StrategyBinaryPay_binary_id_fkey` FOREIGN KEY (`binary_id`) REFERENCES `strategy_binary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StrategyBinaryPay` ADD CONSTRAINT `StrategyBinaryPay_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
