/*
  Warnings:

  - You are about to drop the `category_levels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `category_levels` DROP FOREIGN KEY `category_levels_category_id_fkey`;

-- DropTable
DROP TABLE `category_levels`;

-- CreateTable
CREATE TABLE `category_items` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` ENUM('DIRECT', 'UNILEVER', 'BINARY', 'RESIDUAL') NOT NULL,
    `category_id` BIGINT UNSIGNED NOT NULL,
    `max_value` DECIMAL(10, 2) NULL,
    `level_values` JSON NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `category_items_type_category_id_key`(`type`, `category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `category_items` ADD CONSTRAINT `category_items_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
