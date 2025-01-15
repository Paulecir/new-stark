/*
  Warnings:

  - You are about to drop the column `binary_bonus_yields` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `unilevel_bonus_yields` on the `categories` table. All the data in the column will be lost.
  - The values [UNILEVER] on the enum `strategy_progress_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [UNILEVER] on the enum `order_item_distribution_strategy` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `unilevel_bonus_yields` on the `products` table. All the data in the column will be lost.
  - The values [UNILEVER] on the enum `strategy_progress_type` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `strategy_progress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The values [UNILEVER] on the enum `strategy_progress_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `categories` DROP COLUMN `binary_bonus_yields`,
    DROP COLUMN `unilevel_bonus_yields`,
    ADD COLUMN `binary_bonus_yield` DECIMAL(10, 4) NULL,
    ADD COLUMN `unilevel_bonus_yield` DECIMAL(10, 4) NULL;

-- AlterTable
ALTER TABLE `category_items` MODIFY `type` ENUM('DIRECT', 'UNILEVEL', 'BINARY', 'RESIDUAL') NOT NULL;

-- AlterTable
ALTER TABLE `order_item_distribution` MODIFY `strategy` ENUM('DIRECT', 'UNILEVEL', 'BINARY', 'RESIDUAL') NOT NULL;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `unilevel_bonus_yields`,
    ADD COLUMN `unilevel_bonus_yield` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `strategy_config` MODIFY `type` ENUM('DIRECT', 'UNILEVEL', 'BINARY', 'RESIDUAL') NOT NULL;

-- AlterTable
ALTER TABLE `strategy_progress` DROP PRIMARY KEY,
    MODIFY `type` ENUM('DIRECT', 'UNILEVEL', 'BINARY', 'RESIDUAL') NOT NULL,
    ADD PRIMARY KEY (`type`, `user_id`);
