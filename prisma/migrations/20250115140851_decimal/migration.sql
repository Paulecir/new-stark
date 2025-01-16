/*
  Warnings:

  - You are about to alter the column `amount` on the `balance` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,8)`.
  - You are about to alter the column `amount` on the `balance_history` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,8)`.
  - You are about to alter the column `direct_bonus_yield` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,4)` to `Decimal(20,8)`.
  - You are about to alter the column `residual_bonus_yield` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,4)` to `Decimal(20,8)`.
  - You are about to alter the column `binary_bonus_point_percent` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,4)` to `Decimal(20,8)`.
  - You are about to alter the column `binary_bonus_yield` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,4)` to `Decimal(20,8)`.
  - You are about to alter the column `unilevel_bonus_yield` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,4)` to `Decimal(20,8)`.
  - You are about to alter the column `max_value` on the `category_items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(20,8)`.
  - You are about to alter the column `amount` on the `order_item` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(20,8)`.
  - You are about to alter the column `amount` on the `order_item_distribution` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,8)`.
  - You are about to alter the column `percent` on the `order_item_distribution` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,8)`.
  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(20,8)`.
  - You are about to alter the column `direct_bonus_yield` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,4)` to `Decimal(20,8)`.
  - You are about to alter the column `yield` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,7)` to `Decimal(20,8)`.
  - You are about to alter the column `value` on the `strategy_config` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(20,8)`.
  - You are about to alter the column `limit` on the `strategy_config` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(20,8)`.
  - You are about to alter the column `percent` on the `strategy_config` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(20,8)`.
  - You are about to alter the column `amount` on the `strategy_progress` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,8)`.

*/
-- AlterTable
ALTER TABLE `balance` MODIFY `amount` DECIMAL(20, 8) NOT NULL;

-- AlterTable
ALTER TABLE `balance_history` MODIFY `amount` DECIMAL(20, 8) NOT NULL;

-- AlterTable
ALTER TABLE `categories` MODIFY `direct_bonus_yield` DECIMAL(20, 8) NULL,
    MODIFY `residual_bonus_yield` DECIMAL(20, 8) NULL,
    MODIFY `binary_bonus_point_percent` DECIMAL(20, 8) NULL,
    MODIFY `binary_bonus_yield` DECIMAL(20, 8) NULL,
    MODIFY `unilevel_bonus_yield` DECIMAL(20, 8) NULL;

-- AlterTable
ALTER TABLE `category_items` MODIFY `max_value` DECIMAL(20, 8) NULL;

-- AlterTable
ALTER TABLE `order_item` MODIFY `amount` DECIMAL(20, 8) NOT NULL;

-- AlterTable
ALTER TABLE `order_item_distribution` MODIFY `amount` DECIMAL(20, 8) NOT NULL,
    MODIFY `percent` DECIMAL(20, 8) NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `price` DECIMAL(20, 8) NOT NULL,
    MODIFY `direct_bonus_yield` DECIMAL(20, 8) NULL,
    MODIFY `yield` DECIMAL(20, 8) NOT NULL;

-- AlterTable
ALTER TABLE `strategy_config` MODIFY `value` DECIMAL(20, 8) NULL,
    MODIFY `limit` DECIMAL(20, 8) NULL,
    MODIFY `percent` DECIMAL(20, 8) NULL;

-- AlterTable
ALTER TABLE `strategy_progress` MODIFY `amount` DECIMAL(20, 8) NOT NULL DEFAULT 0;
