/*
  Warnings:

  - You are about to alter the column `value` on the `strategy_config` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `limit` on the `strategy_config` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `percent` on the `strategy_config` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `strategy_config` MODIFY `value` DECIMAL(10, 2) NULL,
    MODIFY `limit` DECIMAL(10, 2) NULL,
    MODIFY `percent` DECIMAL(10, 2) NULL;
