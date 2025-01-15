/*
  Warnings:

  - The primary key for the `strategy_progress` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `category_items` MODIFY `type` ENUM('DIRECT', 'UNILEVEL', 'UNILEVER', 'BINARY', 'RESIDUAL') NOT NULL;

-- AlterTable
ALTER TABLE `order_item_distribution` MODIFY `strategy` ENUM('DIRECT', 'UNILEVEL', 'UNILEVER', 'BINARY', 'RESIDUAL') NOT NULL;

-- AlterTable
ALTER TABLE `strategy_config` MODIFY `type` ENUM('DIRECT', 'UNILEVEL', 'UNILEVER', 'BINARY', 'RESIDUAL') NOT NULL;

-- AlterTable
ALTER TABLE `strategy_progress` DROP PRIMARY KEY,
    MODIFY `type` ENUM('DIRECT', 'UNILEVEL', 'UNILEVER', 'BINARY', 'RESIDUAL') NOT NULL,
    ADD PRIMARY KEY (`type`, `user_id`);
