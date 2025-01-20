/*
  Warnings:

  - A unique constraint covering the columns `[type,category_id,date]` on the table `commission_scheduler` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `commission_scheduler_type_category_id_date_key` ON `commission_scheduler`(`type`, `category_id`, `date`);
