-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_sponsor_id_fkey`;

-- DropIndex
DROP INDEX `users_phone_unique` ON `users`;
