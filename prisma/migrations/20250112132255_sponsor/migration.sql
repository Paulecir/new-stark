-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_sponsor_id_fkey` FOREIGN KEY (`sponsor_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
