-- AlterTable
ALTER TABLE `BalanceHistory` ADD COLUMN `ref_id` BIGINT NULL,
    ADD COLUMN `ref_type` VARCHAR(191) NULL;
