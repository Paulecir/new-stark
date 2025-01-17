/*
  Warnings:

  - You are about to drop the column `amountTetoBinario` on the `strategy_binary_pay` table. All the data in the column will be lost.
  - You are about to drop the column `amountTetoTotal` on the `strategy_binary_pay` table. All the data in the column will be lost.
  - You are about to drop the column `percentTetoTotal` on the `strategy_binary_pay` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `strategy_binary_pay` DROP COLUMN `amountTetoBinario`,
    DROP COLUMN `amountTetoTotal`,
    DROP COLUMN `percentTetoTotal`,
    ADD COLUMN `amountCeilingUser` DECIMAL(20, 8) NULL,
    ADD COLUMN `amountTotalCeiling` DECIMAL(20, 8) NULL,
    ADD COLUMN `percentTotalCeiling` DECIMAL(20, 8) NULL;
