-- CreateTable
CREATE TABLE `categories` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `direct_bonus` BOOLEAN NULL,
    `direct_bonus_yield` DECIMAL(5, 4) NULL,
    `unilevel_bonus` BOOLEAN NULL DEFAULT false,
    `unilevel_bonus_yields` LONGTEXT NULL,
    `binary_bonus` BOOLEAN NULL DEFAULT false,
    `binary_bonus_yields` LONGTEXT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category_levels` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` ENUM('DIRECT', 'UNILEVER', 'BINARY', 'RESIDUAL') NOT NULL,
    `level` BIGINT NOT NULL,
    `category_id` BIGINT UNSIGNED NOT NULL,
    `value` DECIMAL(10, 2) NULL,
    `limit` DECIMAL(10, 2) NULL,
    `percent` DECIMAL(10, 2) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `category_levels_level_category_id_key`(`level`, `category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `category_levels` ADD CONSTRAINT `category_levels_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
