/*
  Warnings:

  - You are about to drop the column `commentId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_commentId_fkey`;

-- DropIndex
DROP INDEX `Comment_commentId_fkey` ON `Comment`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `commentId`,
    ADD COLUMN `parentCommentId` VARCHAR(191) NULL,
    MODIFY `type` ENUM('post', 'comment') NOT NULL DEFAULT 'post';

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parentCommentId_fkey` FOREIGN KEY (`parentCommentId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
