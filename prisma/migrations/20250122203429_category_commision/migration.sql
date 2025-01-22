-- AlterTable
ALTER TABLE `withdraw` ADD COLUMN `wallet_id` BIGINT UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `withdraw` ADD CONSTRAINT `withdraw_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `Wallet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
