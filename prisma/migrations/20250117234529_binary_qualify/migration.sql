-- CreateTable
CREATE TABLE `Webhook` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `request` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
