/*
  Warnings:

  - You are about to drop the `strategy_binary_limit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `strategy_binary_limit`;

-- CreateTable
CREATE TABLE `strategy_config` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` ENUM('DIRECT', 'UNILEVER', 'BINARY', 'RESIDUAL') NOT NULL,
    `level` INTEGER NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `limit` DECIMAL(65, 30) NOT NULL,
    `percent` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
