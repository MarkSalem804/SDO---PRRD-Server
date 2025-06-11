-- CreateTable
CREATE TABLE `contributors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(191) NULL,
    `position` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `socials` JSON NULL,
    `category` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
