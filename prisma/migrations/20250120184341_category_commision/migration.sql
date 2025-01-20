-- AlterTable
ALTER TABLE `commission_scheduler` MODIFY `status` ENUM('SCHEDULER', 'DONE', 'CANCEL') NOT NULL DEFAULT 'SCHEDULER';
