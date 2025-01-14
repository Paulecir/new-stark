/*
  Warnings:

  - You are about to drop the `OrderItemDistribution` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `OrderItemDistribution` DROP FOREIGN KEY `OrderItemDistribution_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItemDistribution` DROP FOREIGN KEY `OrderItemDistribution_order_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItemDistribution` DROP FOREIGN KEY `OrderItemDistribution_user_id_fkey`;

-- DropTable
DROP TABLE `OrderItemDistribution`;

-- CreateTable
CREATE TABLE `order_item_distribution` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `strategy` ENUM('DIRECT', 'UNILEVER', 'BINARY', 'RESIDUAL') NOT NULL,
    `status` ENUM('QUEUED', 'ERROR', 'DONE') NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `percent` DECIMAL(65, 30) NOT NULL,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `order_item_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `order_item_distribution_order_item_id_user_id_strategy_key`(`order_item_id`, `user_id`, `strategy`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order_item_distribution` ADD CONSTRAINT `order_item_distribution_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_item_distribution` ADD CONSTRAINT `order_item_distribution_order_item_id_fkey` FOREIGN KEY (`order_item_id`) REFERENCES `order_item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_item_distribution` ADD CONSTRAINT `order_item_distribution_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
