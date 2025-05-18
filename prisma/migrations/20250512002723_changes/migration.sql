/*
  Warnings:

  - The primary key for the `PostReaction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `PostReaction` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`postId`, `userId`, `type`);
