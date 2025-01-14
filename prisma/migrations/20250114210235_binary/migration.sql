/*
  Warnings:

  - You are about to drop the column `createdAt` on the `balance` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `balance` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `balance_history` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `balance_history` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - You are about to alter the column `unilevel_bonus_yields` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Decimal(10,4)`.
  - You are about to alter the column `binary_bonus_yields` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Decimal(10,4)`.
  - You are about to alter the column `residual_bonus_yield` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,4)` to `Decimal(10,4)`.
  - You are about to drop the column `createdAt` on the `category_items` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `category_items` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `order_item_distribution` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `order_item_distribution` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `strategy_binary` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `strategy_binary` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `strategy_config` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `strategy_config` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `strategy_progress` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `strategy_progress` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user_session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user_session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `balance` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `balance_history` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `binary_bonus_point_percent` DECIMAL(10, 4) NULL,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `unilevel_bonus_yields` DECIMAL(10, 4) NULL,
    MODIFY `binary_bonus_yields` DECIMAL(10, 4) NULL,
    MODIFY `residual_bonus_yield` DECIMAL(10, 4) NULL;

-- AlterTable
ALTER TABLE `category_items` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `order_item_distribution` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `password_reset_tokens` ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `password_resets` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `personal_access_tokens` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `strategy_binary` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `strategy_config` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `strategy_progress` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user_session` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL;
