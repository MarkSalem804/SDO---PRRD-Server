/*
  Warnings:

  - You are about to drop the column `descriptiom` on the `section` table. All the data in the column will be lost.
  - Added the required column `description` to the `section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `section` DROP COLUMN `descriptiom`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
