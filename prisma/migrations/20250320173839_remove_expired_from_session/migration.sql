/*
  Warnings:

  - You are about to drop the column `expired` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Session` DROP COLUMN `expired`;

-- AlterTable
ALTER TABLE `Staff` DROP COLUMN `name`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL;
