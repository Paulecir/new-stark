/*
  Warnings:

  - Added the required column `original_amount` to the `withdraw` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `withdraw` ADD COLUMN `hash` MEDIUMTEXT NULL,
    ADD COLUMN `original_amount` DECIMAL(20, 8) NOT NULL;
