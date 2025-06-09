/*
  Warnings:

  - You are about to drop the column `title` on the `content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `dataContext` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `section` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `content` DROP COLUMN `title`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `schoolYear` VARCHAR(191) NULL,
    ADD COLUMN `sectionId` INTEGER NULL,
    ADD COLUMN `titleId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `dataContext_id_key` ON `dataContext`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `section_id_key` ON `section`(`id`);

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `dataContext`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `section`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
