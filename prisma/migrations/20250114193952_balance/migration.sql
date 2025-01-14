/*
  Warnings:

  - You are about to drop the `Balance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BalanceHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Balance` DROP FOREIGN KEY `Balance_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `BalanceHistory` DROP FOREIGN KEY `BalanceHistory_user_id_fkey`;

-- DropTable
DROP TABLE `Balance`;

-- DropTable
DROP TABLE `BalanceHistory`;

-- CreateTable
CREATE TABLE `balance` (
    `user_id` BIGINT UNSIGNED NOT NULL,
    `wallet` ENUM('MAIN') NOT NULL DEFAULT 'MAIN',
    `amount` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `balance_user_id_wallet_key`(`user_id`, `wallet`),
    PRIMARY KEY (`user_id`, `wallet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `balance_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `wallet` ENUM('MAIN') NOT NULL DEFAULT 'MAIN',
    `direction` ENUM('CREDIT', 'DEBIT') NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `ref_type` VARCHAR(191) NULL,
    `ref_id` BIGINT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `balance` ADD CONSTRAINT `balance_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `balance_history` ADD CONSTRAINT `balance_history_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
