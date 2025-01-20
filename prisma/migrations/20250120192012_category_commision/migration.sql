-- CreateTable
CREATE TABLE `commission` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `scheduler_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `status` ENUM('PENDING', 'PAYED') NOT NULL DEFAULT 'PENDING',
    `amount` DECIMAL(20, 8) NOT NULL,
    `total` DECIMAL(20, 8) NOT NULL,
    `percent` DECIMAL(20, 8) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `commission_scheduler_id_user_id_key`(`scheduler_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `commission` ADD CONSTRAINT `commission_scheduler_id_fkey` FOREIGN KEY (`scheduler_id`) REFERENCES `commission_scheduler`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commission` ADD CONSTRAINT `commission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
