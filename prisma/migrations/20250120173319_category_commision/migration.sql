/*
  Warnings:

  - You are about to drop the `SchedulerCommision` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SchedulerCommision` DROP FOREIGN KEY `SchedulerCommision_category_id_fkey`;

-- DropTable
DROP TABLE `SchedulerCommision`;

-- CreateTable
CREATE TABLE `commission_scheduler` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` ENUM('COMMISION', 'RESIDUAL') NOT NULL,
    `category_id` BIGINT UNSIGNED NOT NULL,
    `status` ENUM('SCHEDULER', 'DONE', 'CANCEL') NOT NULL,
    `amount` DECIMAL(20, 8) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `commission_scheduler` ADD CONSTRAINT `commission_scheduler_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
