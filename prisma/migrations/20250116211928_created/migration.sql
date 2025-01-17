/*
  Warnings:

  - The primary key for the `balance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `updatedAt` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `balance` DROP PRIMARY KEY,
    MODIFY `wallet` ENUM('MAIN', 'PENDING', 'WITHDRAW', 'GENERAL_POINT', 'BINARY_LEFT_POINT', 'BINARY_RIGHT_POINT') NOT NULL DEFAULT 'MAIN',
    ADD PRIMARY KEY (`user_id`, `wallet`);

-- AlterTable
ALTER TABLE `balance_history` MODIFY `wallet` ENUM('MAIN', 'PENDING', 'WITHDRAW', 'GENERAL_POINT', 'BINARY_LEFT_POINT', 'BINARY_RIGHT_POINT') NOT NULL DEFAULT 'MAIN';

-- AlterTable
ALTER TABLE `order` DROP COLUMN `updatedAt`,
    ADD COLUMN `total` DECIMAL(20, 8) NOT NULL DEFAULT 0,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `points` DECIMAL(20, 8) NOT NULL DEFAULT 0;
