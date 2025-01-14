/*
  Warnings:

  - A unique constraint covering the columns `[type,level,value]` on the table `strategy_config` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `strategy_config` MODIFY `value` DECIMAL(65, 30) NULL,
    MODIFY `limit` DECIMAL(65, 30) NULL,
    MODIFY `percent` DECIMAL(65, 30) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `strategy_config_type_level_value_key` ON `strategy_config`(`type`, `level`, `value`);
