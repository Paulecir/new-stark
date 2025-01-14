-- CreateTable
CREATE TABLE `strategy_binary_limit` (
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
