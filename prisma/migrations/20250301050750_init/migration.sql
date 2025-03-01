-- AlterTable
ALTER TABLE `balance_history` ADD COLUMN `last_balance` DECIMAL(20, 8) NOT NULL DEFAULT 0;
