/*
  Warnings:

  - A unique constraint covering the columns `[type,category_id,max_value]` on the table `category_items` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `category_items_type_category_id_key` ON `category_items`;

-- CreateIndex
CREATE UNIQUE INDEX `category_items_type_category_id_max_value_key` ON `category_items`(`type`, `category_id`, `max_value`);
