-- AlterTable
ALTER TABLE `categories` ADD COLUMN `binary_bonus_levels` INTEGER NULL,
    ADD COLUMN `direct_bonus_levels` INTEGER NULL,
    ADD COLUMN `residual_bonus` BOOLEAN NULL,
    ADD COLUMN `residual_bonus_levels` INTEGER NULL,
    ADD COLUMN `residual_bonus_yield` DECIMAL(5, 4) NULL,
    ADD COLUMN `unilevel_bonus_levels` INTEGER NULL;
