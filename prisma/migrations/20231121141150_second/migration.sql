/*
  Warnings:

  - You are about to drop the column `subjectkey` on the `grade` table. All the data in the column will be lost.
  - You are about to drop the column `lastOnline` on the `matchtable` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `student` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(6))` to `VarChar(45)`.
  - You are about to alter the column `status` on the `tutor` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(7))` to `VarChar(45)`.
  - You are about to alter the column `verify` on the `tutor` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(8))` to `VarChar(45)`.
  - You are about to drop the column `favouritetutorId` on the `user` table. All the data in the column will be lost.
  - Added the required column `subjectKey` to the `grade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `favourite` DROP FOREIGN KEY `favourite_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `favourite` DROP FOREIGN KEY `favourite_tutorId_fkey`;

-- DropForeignKey
ALTER TABLE `favourite` DROP FOREIGN KEY `favourite_userId_fkey`;

-- DropForeignKey
ALTER TABLE `matchtable` DROP FOREIGN KEY `matchTable_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `matchtable` DROP FOREIGN KEY `matchTable_tutorId_fkey`;

-- DropForeignKey
ALTER TABLE `tutor` DROP FOREIGN KEY `tutor_userId_fkey`;

-- AlterTable
ALTER TABLE `grade` DROP COLUMN `subjectkey`,
    ADD COLUMN `subjectKey` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `matchtable` DROP COLUMN `lastOnline`,
    MODIFY `availability` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `checkStatus` ENUM('NOT_YET_CHECKED', 'CHECKING', 'CHECKED') NOT NULL DEFAULT 'NOT_YET_CHECKED',
    MODIFY `matchstatus` ENUM('REJECTED', 'ASK_AGAIN', 'NO_LONGER_MATCH', 'OPEN') NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `availtime` VARCHAR(600) NULL;

-- AlterTable
ALTER TABLE `student` MODIFY `status` VARCHAR(45) NULL DEFAULT 'open';

-- AlterTable
ALTER TABLE `tutor` MODIFY `status` VARCHAR(45) NULL DEFAULT 'open',
    MODIFY `verify` VARCHAR(45) NULL DEFAULT '未驗證';

-- AlterTable
ALTER TABLE `user` DROP COLUMN `favouritetutorId`,
    ADD COLUMN `favouritetutorid` JSON NULL;

-- AddForeignKey
ALTER TABLE `favourite` ADD CONSTRAINT `favourite_studentid_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`studentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favourite` ADD CONSTRAINT `favourite_tutorid_fkey` FOREIGN KEY (`tutorId`) REFERENCES `tutor`(`tutorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favourite` ADD CONSTRAINT `favourite_userid_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutor` ADD CONSTRAINT `tutor_userid_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matchtable` ADD CONSTRAINT `matchtable_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`studentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matchtable` ADD CONSTRAINT `matchtable_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `tutor`(`tutorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `matchtable` RENAME INDEX `matchTable_studentId_fkey` TO `matchtable_studentId_fkey`;

-- RenameIndex
ALTER TABLE `matchtable` RENAME INDEX `matchTable_tutorId_fkey` TO `matchtable_tutorId_fkey`;

-- RenameIndex
ALTER TABLE `profile` RENAME INDEX `profile_userId_key` TO `profile_userid_key`;

-- RenameIndex
ALTER TABLE `tutor` RENAME INDEX `tutor_userId_key` TO `tutor_userid_key`;
