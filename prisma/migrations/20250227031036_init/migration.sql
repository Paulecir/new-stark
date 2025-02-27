/*
  Warnings:

  - A unique constraint covering the columns `[user_id,date_ref,category_id]` on the table `commission_order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `commission_order` table without a default value. This is not possible if the table is not empty.
  - Made the column `date_ref` on table `commission_order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `commission_order` ADD COLUMN `category_id` BIGINT UNSIGNED NOT NULL,
    MODIFY `date_ref` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `commission_order_user_id_date_ref_category_id_key` ON `commission_order`(`user_id`, `date_ref`, `category_id`);

-- AddForeignKey
ALTER TABLE `commission_order` ADD CONSTRAINT `commission_order_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
