-- CreateTable
CREATE TABLE `ImportOrders` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `info` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
