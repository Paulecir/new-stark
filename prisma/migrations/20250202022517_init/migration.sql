/*
  Warnings:

  - The primary key for the `balance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `wallet_id` on the `withdraw` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `withdraw` DROP FOREIGN KEY `withdraw_wallet_id_fkey`;

-- DropIndex
DROP INDEX `withdraw_wallet_id_fkey` ON `withdraw`;

-- AlterTable
ALTER TABLE `balance` DROP PRIMARY KEY,
    MODIFY `wallet` ENUM('MAIN', 'PENDING', 'WITHDRAW', 'GENERAL_POINT', 'BINARY_CEILING_USER', 'BINARY_LEFT_POINT', 'BINARY_RIGHT_POINT', 'BINARY_LEFT_POINT_PAY', 'BINARY_RIGHT_POINT_PAY', 'DIRECT_BONUS', 'WINWIN_BONUS', 'TOKENWAY_BONUS', 'TOKENTEEN_BONUS', 'TOKENONE_BONUS', 'BINARY_BONUS') NOT NULL DEFAULT 'MAIN',
    ADD PRIMARY KEY (`user_id`, `wallet`);

-- AlterTable
ALTER TABLE `balance_history` MODIFY `wallet` ENUM('MAIN', 'PENDING', 'WITHDRAW', 'GENERAL_POINT', 'BINARY_CEILING_USER', 'BINARY_LEFT_POINT', 'BINARY_RIGHT_POINT', 'BINARY_LEFT_POINT_PAY', 'BINARY_RIGHT_POINT_PAY', 'DIRECT_BONUS', 'WINWIN_BONUS', 'TOKENWAY_BONUS', 'TOKENTEEN_BONUS', 'TOKENONE_BONUS', 'BINARY_BONUS') NOT NULL DEFAULT 'MAIN';

-- AlterTable
ALTER TABLE `withdraw` DROP COLUMN `wallet_id`;
