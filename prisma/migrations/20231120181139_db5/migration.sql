/*
  Warnings:

  - The primary key for the `studentlocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `studentid` on the `studentlocation` table. All the data in the column will be lost.
  - You are about to drop the `match` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subjectkey` to the `grade` table without a default value. This is not possible if the table is not empty.
  - Made the column `subject` on table `grade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `studentId` to the `studentlocation` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `tutor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `verify` on table `tutor` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `favourite` DROP FOREIGN KEY `favourite_studentid_fkey`;

-- DropForeignKey
ALTER TABLE `favourite` DROP FOREIGN KEY `favourite_tutorid_fkey`;

-- DropForeignKey
ALTER TABLE `match` DROP FOREIGN KEY `match_studentid_fkey`;

-- DropForeignKey
ALTER TABLE `match` DROP FOREIGN KEY `match_tutorid_fkey`;

-- DropForeignKey
ALTER TABLE `studentlocation` DROP FOREIGN KEY `studentLocation_studentid_fkey`;

-- AlterTable
ALTER TABLE `favourite` MODIFY `studentid` INTEGER NULL,
    MODIFY `tutorid` INTEGER NULL;

-- AlterTable
ALTER TABLE `grade` ADD COLUMN `subjectkey` VARCHAR(191) NOT NULL,
    MODIFY `subject` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `student` MODIFY `status` ENUM('OPEN', 'CLOSE', 'BLOCKED') NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE `studentlocation` DROP PRIMARY KEY,
    DROP COLUMN `studentid`,
    ADD COLUMN `studentId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`studentId`, `locationId`);

-- AlterTable
ALTER TABLE `tutor` MODIFY `status` ENUM('OPEN', 'CLOSE', 'BLOCKED') NOT NULL DEFAULT 'OPEN',
    MODIFY `verify` ENUM('NOT_VERIFIED', 'VERIFIED') NOT NULL DEFAULT 'NOT_VERIFIED';

-- DropTable
DROP TABLE `match`;

-- CreateTable
CREATE TABLE `matchTable` (
    `idmatch` INTEGER NOT NULL AUTO_INCREMENT,
    `studentid` INTEGER NOT NULL,
    `availability` BOOLEAN NOT NULL,
    `checkStatus` ENUM('NOT_YET_CHECKED', 'CHECKING', 'CHECKED') NOT NULL,
    `tutorid` INTEGER NOT NULL,
    `matchstatus` ENUM('REJECTED', 'ASK_AGAIN', 'NO_LONGER_MATCH', 'OPEN') NOT NULL,
    `lastOnline` DATETIME(0) NULL,

    INDEX `matchTable_studentid_fkey`(`studentid`),
    INDEX `matchTable_tutorid_fkey`(`tutorid`),
    PRIMARY KEY (`idmatch`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favourite` ADD CONSTRAINT `favourite_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `student`(`studentid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favourite` ADD CONSTRAINT `favourite_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matchTable` ADD CONSTRAINT `matchTable_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `student`(`studentid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matchTable` ADD CONSTRAINT `matchTable_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentlocation` ADD CONSTRAINT `studentLocation_studentid_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`studentid`) ON DELETE RESTRICT ON UPDATE CASCADE;
