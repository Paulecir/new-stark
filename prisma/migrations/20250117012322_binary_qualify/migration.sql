/*
  Warnings:

  - You are about to drop the `StrategyBinaryPay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `StrategyBinaryPay` DROP FOREIGN KEY `StrategyBinaryPay_binary_id_fkey`;

-- DropForeignKey
ALTER TABLE `StrategyBinaryPay` DROP FOREIGN KEY `StrategyBinaryPay_user_id_fkey`;

-- DropTable
DROP TABLE `StrategyBinaryPay`;

-- CreateTable
CREATE TABLE `strategy_binary_pay` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,
    `binary_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `amount` DECIMAL(20, 8) NOT NULL,
    `points` DECIMAL(20, 8) NOT NULL,
    `qualify` BOOLEAN NOT NULL DEFAULT false,
    `mirror` JSON NULL,
    `status` ENUM('PENDING', 'PAYED') NOT NULL DEFAULT 'PENDING',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `strategy_binary_pay_date_binary_id_user_id_key`(`date`, `binary_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `strategy_binary_pay` ADD CONSTRAINT `strategy_binary_pay_binary_id_fkey` FOREIGN KEY (`binary_id`) REFERENCES `strategy_binary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `strategy_binary_pay` ADD CONSTRAINT `strategy_binary_pay_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
