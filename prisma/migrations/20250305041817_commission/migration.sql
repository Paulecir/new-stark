-- AlterTable
ALTER TABLE `commission_scheduler` MODIFY `status` ENUM('SCHEDULER', 'DONE', 'PAYED', 'CANCEL') NOT NULL DEFAULT 'SCHEDULER';
