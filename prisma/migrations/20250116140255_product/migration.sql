/*
  Warnings:

  - You are about to drop the column `direct_bonus` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `direct_bonus_yield` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `unilevel_bonus` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `unilevel_bonus_yield` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `direct_bonus`,
    DROP COLUMN `direct_bonus_yield`,
    DROP COLUMN `unilevel_bonus`,
    DROP COLUMN `unilevel_bonus_yield`;
