-- AlterTable
ALTER TABLE `UserSession` ADD COLUMN `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';
