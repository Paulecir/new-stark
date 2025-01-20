/*
  Warnings:

  - You are about to drop the column `hier` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `hier`,
    ADD COLUMN `ancestry` LONGTEXT NULL;
