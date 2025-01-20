-- CreateTable
CREATE TABLE `SchedulerCommision` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` ENUM('COMMISION', 'RESIDUAL') NOT NULL,
    `category_id` BIGINT UNSIGNED NOT NULL,
    `status` ENUM('SCHEDULER', 'DONE', 'CANCEL') NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SchedulerCommision` ADD CONSTRAINT `SchedulerCommision_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
