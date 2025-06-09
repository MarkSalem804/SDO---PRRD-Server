-- AlterTable
ALTER TABLE `datacontext` ADD COLUMN `sectionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `dataContext` ADD CONSTRAINT `dataContext_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `section`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
