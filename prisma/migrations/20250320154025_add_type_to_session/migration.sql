-- AlterTable
ALTER TABLE `Session` ADD COLUMN `type` ENUM('user', 'staff') NOT NULL DEFAULT 'user';
