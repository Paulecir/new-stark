/*
  Warnings:

  - The values [COMMISION] on the enum `commission_scheduler_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `commission_scheduler` MODIFY `type` ENUM('COMMISSION', 'RESIDUAL') NOT NULL;
