-- AlterTable
ALTER TABLE `strategy_binary` ADD COLUMN `left_qualify` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `right_qualify` BOOLEAN NOT NULL DEFAULT false;
