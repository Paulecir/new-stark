/*
  Warnings:

  - You are about to drop the column `createdAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `order_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `order_item` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL;
