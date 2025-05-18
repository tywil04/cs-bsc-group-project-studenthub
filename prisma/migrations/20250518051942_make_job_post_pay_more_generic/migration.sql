/*
  Warnings:

  - You are about to drop the column `hourlyPay` on the `JobPost` table. All the data in the column will be lost.
  - Added the required column `pay` to the `JobPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `JobPost` DROP COLUMN `hourlyPay`,
    ADD COLUMN `pay` VARCHAR(191) NOT NULL;
