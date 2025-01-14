/*
  Warnings:

  - You are about to drop the `UserSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserSession` DROP FOREIGN KEY `UserSession_user_id_fkey`;

-- DropTable
DROP TABLE `UserSession`;

-- CreateTable
CREATE TABLE `user_session` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `access_token` LONGTEXT NOT NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_id` BIGINT UNSIGNED NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_session` ADD CONSTRAINT `user_session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
