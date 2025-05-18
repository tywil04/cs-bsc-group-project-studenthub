/*
  Warnings:

  - You are about to drop the column `pricePerWeekPerPerson` on the `AccomodationPost` table. All the data in the column will be lost.
  - Added the required column `price` to the `AccomodationPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AccomodationPost` DROP COLUMN `pricePerWeekPerPerson`,
    ADD COLUMN `price` VARCHAR(191) NOT NULL;
