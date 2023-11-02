/*
  Warnings:

  - You are about to drop the column `availtutor` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `checked` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `checking` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `notavailtutor` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `match` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userid]` on the table `tutor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `availability` to the `match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkStatus` to the `match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutorid` to the `match` table without a default value. This is not possible if the table is not empty.
  - Made the column `studentid` on table `match` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `tutor` DROP FOREIGN KEY `tutor_userid_key`;

-- DropIndex
DROP INDEX `studentid_UNIQUE` ON `match`;

-- AlterTable
ALTER TABLE `match` DROP COLUMN `availtutor`,
    DROP COLUMN `checked`,
    DROP COLUMN `checking`,
    DROP COLUMN `notavailtutor`,
    DROP COLUMN `status`,
    ADD COLUMN `availability` BOOLEAN NOT NULL,
    ADD COLUMN `checkStatus` ENUM('NOT_YET_CHECKED', 'CHECKING', 'CHECKED') NOT NULL,
    ADD COLUMN `tutorid` INTEGER NOT NULL,
    MODIFY `studentid` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `matchStatus` (
    `idstatus` INTEGER NOT NULL AUTO_INCREMENT,
    `studentid` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `matchStatus_studentid_key`(`studentid`),
    PRIMARY KEY (`idstatus`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `tutor_userid_key` ON `tutor`(`userid`);

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutor` ADD CONSTRAINT `tutor_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`userid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match` ADD CONSTRAINT `match_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `student`(`studentid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match` ADD CONSTRAINT `match_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matchStatus` ADD CONSTRAINT `matchStatus_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `student`(`studentid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `apply` RENAME INDEX `Apply_userId_key` TO `apply_userid_key`;

-- RenameIndex
ALTER TABLE `profile` RENAME INDEX `Profile_userId_key` TO `profile_userid_key`;
