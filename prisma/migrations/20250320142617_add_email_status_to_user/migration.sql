-- AlterTable
ALTER TABLE `User` ADD COLUMN `emailStatus` ENUM('unverified', 'verified') NOT NULL DEFAULT 'unverified';
