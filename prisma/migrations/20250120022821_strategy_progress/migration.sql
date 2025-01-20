-- AlterTable
ALTER TABLE `strategy_binary` ADD COLUMN `strategy` ENUM('AUTO', 'RIGHT', 'LEFT') NOT NULL DEFAULT 'AUTO';
