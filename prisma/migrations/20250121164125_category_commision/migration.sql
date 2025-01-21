/*
  Warnings:

  - A unique constraint covering the columns `[scheduler_id,user_id,order_item_id]` on the table `commission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_item_id` to the `commission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `commission` DROP FOREIGN KEY `commission_scheduler_id_fkey`;

-- DropIndex
DROP INDEX `commission_scheduler_id_user_id_key` ON `commission`;

-- AlterTable
ALTER TABLE `commission` ADD COLUMN `order_item_id` BIGINT UNSIGNED NOT NULL,
    ADD COLUMN `wallet_id` BIGINT UNSIGNED NULL;

-- CreateIndex
CREATE UNIQUE INDEX `commission_scheduler_id_user_id_order_item_id_key` ON `commission`(`scheduler_id`, `user_id`, `order_item_id`);

-- AddForeignKey
ALTER TABLE `commission` ADD CONSTRAINT `commission_order_item_id_fkey` FOREIGN KEY (`order_item_id`) REFERENCES `order_item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commission` ADD CONSTRAINT `commission_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `Wallet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
