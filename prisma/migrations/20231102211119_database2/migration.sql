/*
  Warnings:

  - You are about to drop the column `userId` on the `student` table. All the data in the column will be lost.
  - Added the required column `userid` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `student_userId_fkey`;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `userId`,
    ADD COLUMN `userid` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `favourite` (
    `idfavourite` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `studentid` INTEGER NOT NULL,
    `tutorid` INTEGER NOT NULL,

    PRIMARY KEY (`idfavourite`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favourite` ADD CONSTRAINT `favourite_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favourite` ADD CONSTRAINT `favourite_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `student`(`studentid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favourite` ADD CONSTRAINT `favourite_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;
