/*
  Warnings:

  - Made the column `user_id` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_user_id_fkey`;

-- DropIndex
DROP INDEX `order_user_id_fkey` ON `order`;

-- AlterTable
ALTER TABLE `order` MODIFY `user_id` BIGINT UNSIGNED NOT NULL,
    MODIFY `status` ENUM('init', 'pending', 'payed', 'done', 'canceled') NOT NULL DEFAULT 'init';

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
