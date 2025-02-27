/*
  Warnings:

  - A unique constraint covering the columns `[user_id,status]` on the table `commission_order` will be added. If there are existing duplicate values, this will fail.
  - Made the column `date_ref` on table `commission_order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `commission_order` MODIFY `date_ref` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `commission_order_user_id_status_key` ON `commission_order`(`user_id`, `status`);
