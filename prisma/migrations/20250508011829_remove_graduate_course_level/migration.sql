/*
  Warnings:

  - The values [graduate] on the enum `Course_level` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Course` MODIFY `level` ENUM('undergraduate', 'postgraduate') NOT NULL;
