-- AlterTable
ALTER TABLE `Image` ADD COLUMN `status` ENUM('unreviewed', 'allowed', 'blocked') NOT NULL DEFAULT 'unreviewed';
