/*
  Warnings:

  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileImageMimeType` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_postId_fkey`;

-- DropIndex
DROP INDEX `Image_postId_fkey` ON `Image`;

-- AlterTable
ALTER TABLE `Image` ADD COLUMN `type` ENUM('post', 'profile') NOT NULL DEFAULT 'post',
    ADD COLUMN `userId` VARCHAR(191) NULL,
    MODIFY `postId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `profileImage`,
    DROP COLUMN `profileImageMimeType`;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
