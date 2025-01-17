/*
  Warnings:

  - The primary key for the `balance` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `balance` DROP PRIMARY KEY,
    MODIFY `wallet` ENUM('MAIN', 'PENDING', 'WITHDRAW', 'GENERAL_POINT', 'BINARY_CEILING_USER', 'BINARY_LEFT_POINT', 'BINARY_RIGHT_POINT') NOT NULL DEFAULT 'MAIN',
    ADD PRIMARY KEY (`user_id`, `wallet`);

-- AlterTable
ALTER TABLE `balance_history` MODIFY `wallet` ENUM('MAIN', 'PENDING', 'WITHDRAW', 'GENERAL_POINT', 'BINARY_CEILING_USER', 'BINARY_LEFT_POINT', 'BINARY_RIGHT_POINT') NOT NULL DEFAULT 'MAIN';
