/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `Profile`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `WLK_COURS_FLAG_NM` VARCHAR(191) NOT NULL,
    `WLK_COURS_NM` VARCHAR(191) NOT NULL,
    `COURS_DC` VARCHAR(191) NOT NULL,
    `SIGNGU_NM` VARCHAR(191) NOT NULL,
    `COURS_LEVEL_NM` VARCHAR(191) NOT NULL,
    `COURS_LT_CN` DOUBLE NOT NULL,
    `COURS_DETAIL_LT_CN` VARCHAR(191) NOT NULL,
    `ADIT_DC` VARCHAR(500) NOT NULL,
    `COURS_TIME_CN` VARCHAR(191) NOT NULL,
    `OPTN_DC` VARCHAR(191) NOT NULL,
    `TOILET_DC` VARCHAR(191) NOT NULL,
    `CVNTL_NM` VARCHAR(191) NOT NULL,
    `LNM_ADDR` VARCHAR(191) NOT NULL,
    `COURS_SPOT_LA` DOUBLE NOT NULL,
    `COURS_SPOT_LO` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
