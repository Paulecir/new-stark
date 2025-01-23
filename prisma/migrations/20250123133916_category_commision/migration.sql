-- AlterTable
ALTER TABLE `users` ADD COLUMN `avatar` MEDIUMTEXT NULL,
    ADD COLUMN `document` VARCHAR(191) NULL,
    ADD COLUMN `document_type` ENUM('CPF', 'CNPJ') NULL DEFAULT 'CPF',
    ADD COLUMN `gender` VARCHAR(191) NULL;
