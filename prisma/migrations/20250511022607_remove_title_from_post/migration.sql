/*
  Warnings:

  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Post_title_key` ON `Post`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `title`;
