-- CreateTable
CREATE TABLE `change_logs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `table` VARCHAR(255) NOT NULL,
    `record_id` BIGINT UNSIGNED NOT NULL,
    `action` VARCHAR(50) NOT NULL,
    `changes` JSON NOT NULL,
    `user_id` BIGINT UNSIGNED NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
