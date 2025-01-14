-- AlterTable
ALTER TABLE `strategy_binary` ADD COLUMN `left_point` BIGINT NOT NULL DEFAULT 0,
    ADD COLUMN `right_point` BIGINT NOT NULL DEFAULT 0;
