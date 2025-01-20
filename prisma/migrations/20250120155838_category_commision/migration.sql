/*
  Warnings:

  - The values [payed] on the enum `order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `categories` ADD COLUMN `commision` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `commision_pay_config` JSON NULL,
    ADD COLUMN `commision_pay_type` ENUM('diary', 'weekly', 'monthly', 'semiannual', 'annual') NOT NULL DEFAULT 'diary',
    ADD COLUMN `commision_yield_config` JSON NULL,
    ADD COLUMN `commision_yield_type` ENUM('diary', 'weekly', 'monthly', 'semiannual', 'annual') NOT NULL DEFAULT 'diary';

-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('init', 'pending', 'done', 'canceled') NOT NULL DEFAULT 'init';
