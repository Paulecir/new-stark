/*
  Warnings:

  - You are about to drop the column `commision` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `commision_pay_config` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `commision_pay_type` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `commision_yield_config` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `commision_yield_type` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `categories` DROP COLUMN `commision`,
    DROP COLUMN `commision_pay_config`,
    DROP COLUMN `commision_pay_type`,
    DROP COLUMN `commision_yield_config`,
    DROP COLUMN `commision_yield_type`,
    ADD COLUMN `commission` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `commission_pay_config` JSON NULL,
    ADD COLUMN `commission_pay_type` ENUM('diary', 'weekly', 'monthly', 'semiannual', 'annual') NOT NULL DEFAULT 'diary',
    ADD COLUMN `commission_yield_config` JSON NULL,
    ADD COLUMN `commission_yield_type` ENUM('diary', 'weekly', 'monthly', 'semiannual', 'annual') NOT NULL DEFAULT 'diary';
