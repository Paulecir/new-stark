-- AlterTable
ALTER TABLE `users` ADD COLUMN `blocked_at` DATETIME(3) NULL,
    ADD COLUMN `status` ENUM('ACTIVE', 'INACTIVE', 'BLOCKED') NOT NULL DEFAULT 'ACTIVE';
