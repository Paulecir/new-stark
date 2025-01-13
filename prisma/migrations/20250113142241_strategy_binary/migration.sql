/*
  Warnings:

  - You are about to drop the `binary_stats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cache_locks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `failed_jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_batches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `binary_stats` DROP FOREIGN KEY `binary_stats_user_id_foreign`;

-- DropTable
DROP TABLE `binary_stats`;

-- DropTable
DROP TABLE `cache`;

-- DropTable
DROP TABLE `cache_locks`;

-- DropTable
DROP TABLE `failed_jobs`;

-- DropTable
DROP TABLE `job_batches`;

-- DropTable
DROP TABLE `jobs`;

-- CreateTable
CREATE TABLE `strategy_binary` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NULL,
    `parent_id` BIGINT UNSIGNED NULL,
    `left_id` BIGINT UNSIGNED NULL,
    `left_count` BIGINT NOT NULL DEFAULT 0,
    `right_id` BIGINT UNSIGNED NULL,
    `right_count` BIGINT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `strategy_binary` ADD CONSTRAINT `strategy_binary_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `strategy_binary` ADD CONSTRAINT `strategy_binary_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `strategy_binary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `strategy_binary` ADD CONSTRAINT `strategy_binary_left_id_fkey` FOREIGN KEY (`left_id`) REFERENCES `strategy_binary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `strategy_binary` ADD CONSTRAINT `strategy_binary_right_id_fkey` FOREIGN KEY (`right_id`) REFERENCES `strategy_binary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
