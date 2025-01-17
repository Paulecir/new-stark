-- AlterTable
ALTER TABLE `strategy_binary_pay` ADD COLUMN `amountTetoBinario` DECIMAL(20, 8) NULL,
    ADD COLUMN `amountTetoTotal` DECIMAL(20, 8) NULL,
    ADD COLUMN `percentTetoTotal` DECIMAL(20, 8) NULL,
    MODIFY `amountPayed` DECIMAL(20, 8) NULL DEFAULT 0;
