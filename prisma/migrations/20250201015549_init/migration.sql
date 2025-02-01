/*
  Warnings:

  - You are about to drop the `ImportOrders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Webhook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Wallet` DROP FOREIGN KEY `Wallet_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `commission` DROP FOREIGN KEY `commission_wallet_id_fkey`;

-- DropForeignKey
ALTER TABLE `order_item` DROP FOREIGN KEY `order_item_wallet_id_fkey`;

-- DropForeignKey
ALTER TABLE `withdraw` DROP FOREIGN KEY `withdraw_wallet_id_fkey`;

-- DropIndex
DROP INDEX `commission_wallet_id_fkey` ON `commission`;

-- DropIndex
DROP INDEX `order_item_wallet_id_fkey` ON `order_item`;

-- DropIndex
DROP INDEX `withdraw_wallet_id_fkey` ON `withdraw`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `hidden` BOOLEAN NULL DEFAULT false;

-- DropTable
DROP TABLE `ImportOrders`;

-- DropTable
DROP TABLE `Wallet`;

-- DropTable
DROP TABLE `Webhook`;

-- CreateTable
CREATE TABLE `wallet` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `hash` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `import_orders` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `info` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `webhook` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `request` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wallet` ADD CONSTRAINT `wallet_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `order_item_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `wallet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `withdraw` ADD CONSTRAINT `withdraw_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `wallet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commission` ADD CONSTRAINT `commission_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `wallet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
