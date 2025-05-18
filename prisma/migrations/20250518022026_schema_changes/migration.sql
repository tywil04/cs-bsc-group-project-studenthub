/*
  Warnings:

  - You are about to drop the `UserTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserTag` DROP FOREIGN KEY `UserTag_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `UserTag` DROP FOREIGN KEY `UserTag_userId_fkey`;

-- DropTable
DROP TABLE `UserTag`;
