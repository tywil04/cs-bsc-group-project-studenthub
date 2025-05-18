-- AlterTable
ALTER TABLE `User` ADD COLUMN `profileAboutMe` VARCHAR(191) NULL,
    ADD COLUMN `profileImage` LONGBLOB NULL,
    ADD COLUMN `profileImageMimeType` VARCHAR(191) NULL;
