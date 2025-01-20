-- AlterTable
ALTER TABLE `commission` ADD COLUMN `balance_history_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `commission` ADD CONSTRAINT `commission_balance_history_id_fkey` FOREIGN KEY (`balance_history_id`) REFERENCES `balance_history`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
