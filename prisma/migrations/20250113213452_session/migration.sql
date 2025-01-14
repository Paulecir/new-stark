-- CreateTable
CREATE TABLE `UserSession` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `access_token` LONGTEXT NOT NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_id` BIGINT UNSIGNED NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSession` ADD CONSTRAINT `UserSession_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
