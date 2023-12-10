/*
  Warnings:

  - You are about to drop the column `availtime` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `availtime` on the `tutor` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `tutor` table. All the data in the column will be lost.
  - You are about to drop the `apply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `subject` DROP FOREIGN KEY `Subject_studentid_fkey`;

-- DropForeignKey
ALTER TABLE `subject` DROP FOREIGN KEY `Subject_tutorid_fkey`;

-- DropForeignKey
ALTER TABLE `subject` DROP FOREIGN KEY `Subject_userid_fkey`;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `availtime`,
    DROP COLUMN `subject`;

-- AlterTable
ALTER TABLE `tutor` DROP COLUMN `availtime`,
    DROP COLUMN `subject`;

-- DropTable
DROP TABLE `apply`;

-- CreateTable
CREATE TABLE `availtime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentid` INTEGER NULL,
    `tutorid` INTEGER NULL,
    `Mon0800` BOOLEAN NOT NULL DEFAULT false,
    `Mon0900` BOOLEAN NOT NULL DEFAULT false,
    `Mon1000` BOOLEAN NOT NULL DEFAULT false,
    `Mon1100` BOOLEAN NOT NULL DEFAULT false,
    `Mon1200` BOOLEAN NOT NULL DEFAULT false,
    `Mon1300` BOOLEAN NOT NULL DEFAULT false,
    `Mon1400` BOOLEAN NOT NULL DEFAULT false,
    `Mon1500` BOOLEAN NOT NULL DEFAULT false,
    `Mon1600` BOOLEAN NOT NULL DEFAULT false,
    `Mon1700` BOOLEAN NOT NULL DEFAULT false,
    `Mon1800` BOOLEAN NOT NULL DEFAULT false,
    `Mon1900` BOOLEAN NOT NULL DEFAULT false,
    `Mon2000` BOOLEAN NOT NULL DEFAULT false,
    `Mon2100` BOOLEAN NOT NULL DEFAULT false,
    `Mon2200` BOOLEAN NOT NULL DEFAULT false,
    `Tue0800` BOOLEAN NOT NULL DEFAULT false,
    `Tue0900` BOOLEAN NOT NULL DEFAULT false,
    `Tue1000` BOOLEAN NOT NULL DEFAULT false,
    `Tue1100` BOOLEAN NOT NULL DEFAULT false,
    `Tue1200` BOOLEAN NOT NULL DEFAULT false,
    `Tue1300` BOOLEAN NOT NULL DEFAULT false,
    `Tue1400` BOOLEAN NOT NULL DEFAULT false,
    `Tue1500` BOOLEAN NOT NULL DEFAULT false,
    `Tue1600` BOOLEAN NOT NULL DEFAULT false,
    `Tue1700` BOOLEAN NOT NULL DEFAULT false,
    `Tue1800` BOOLEAN NOT NULL DEFAULT false,
    `Tue1900` BOOLEAN NOT NULL DEFAULT false,
    `Tue2000` BOOLEAN NOT NULL DEFAULT false,
    `Tue2100` BOOLEAN NOT NULL DEFAULT false,
    `Tue2200` BOOLEAN NOT NULL DEFAULT false,
    `Wed0800` BOOLEAN NOT NULL DEFAULT false,
    `Wed0900` BOOLEAN NOT NULL DEFAULT false,
    `Wed1000` BOOLEAN NOT NULL DEFAULT false,
    `Wed1100` BOOLEAN NOT NULL DEFAULT false,
    `Wed1200` BOOLEAN NOT NULL DEFAULT false,
    `Wed1300` BOOLEAN NOT NULL DEFAULT false,
    `Wed1400` BOOLEAN NOT NULL DEFAULT false,
    `Wed1500` BOOLEAN NOT NULL DEFAULT false,
    `Wed1600` BOOLEAN NOT NULL DEFAULT false,
    `Wed1700` BOOLEAN NOT NULL DEFAULT false,
    `Wed1800` BOOLEAN NOT NULL DEFAULT false,
    `Wed1900` BOOLEAN NOT NULL DEFAULT false,
    `Wed2000` BOOLEAN NOT NULL DEFAULT false,
    `Wed2100` BOOLEAN NOT NULL DEFAULT false,
    `Wed2200` BOOLEAN NOT NULL DEFAULT false,
    `Thur0800` BOOLEAN NOT NULL DEFAULT false,
    `Thur0900` BOOLEAN NOT NULL DEFAULT false,
    `Thur1000` BOOLEAN NOT NULL DEFAULT false,
    `Thur1100` BOOLEAN NOT NULL DEFAULT false,
    `Thur1200` BOOLEAN NOT NULL DEFAULT false,
    `Thur1300` BOOLEAN NOT NULL DEFAULT false,
    `Thur1400` BOOLEAN NOT NULL DEFAULT false,
    `Thur1500` BOOLEAN NOT NULL DEFAULT false,
    `Thur1600` BOOLEAN NOT NULL DEFAULT false,
    `Thur1700` BOOLEAN NOT NULL DEFAULT false,
    `Thur1800` BOOLEAN NOT NULL DEFAULT false,
    `Thur1900` BOOLEAN NOT NULL DEFAULT false,
    `Thur2000` BOOLEAN NOT NULL DEFAULT false,
    `Thur2100` BOOLEAN NOT NULL DEFAULT false,
    `Thur2200` BOOLEAN NOT NULL DEFAULT false,
    `Fri0800` BOOLEAN NOT NULL DEFAULT false,
    `Fri0900` BOOLEAN NOT NULL DEFAULT false,
    `Fri1000` BOOLEAN NOT NULL DEFAULT false,
    `Fri1100` BOOLEAN NOT NULL DEFAULT false,
    `Fri1200` BOOLEAN NOT NULL DEFAULT false,
    `Fri1300` BOOLEAN NOT NULL DEFAULT false,
    `Fri1400` BOOLEAN NOT NULL DEFAULT false,
    `Fri1500` BOOLEAN NOT NULL DEFAULT false,
    `Fri1600` BOOLEAN NOT NULL DEFAULT false,
    `Fri1700` BOOLEAN NOT NULL DEFAULT false,
    `Fri1800` BOOLEAN NOT NULL DEFAULT false,
    `Fri1900` BOOLEAN NOT NULL DEFAULT false,
    `Fri2000` BOOLEAN NOT NULL DEFAULT false,
    `Fri2100` BOOLEAN NOT NULL DEFAULT false,
    `Fri2200` BOOLEAN NOT NULL DEFAULT false,
    `Sat0800` BOOLEAN NOT NULL DEFAULT false,
    `Sat0900` BOOLEAN NOT NULL DEFAULT false,
    `Sat1000` BOOLEAN NOT NULL DEFAULT false,
    `Sat1100` BOOLEAN NOT NULL DEFAULT false,
    `Sat1200` BOOLEAN NOT NULL DEFAULT false,
    `Sat1300` BOOLEAN NOT NULL DEFAULT false,
    `Sat1400` BOOLEAN NOT NULL DEFAULT false,
    `Sat1500` BOOLEAN NOT NULL DEFAULT false,
    `Sat1600` BOOLEAN NOT NULL DEFAULT false,
    `Sat1700` BOOLEAN NOT NULL DEFAULT false,
    `Sat1800` BOOLEAN NOT NULL DEFAULT false,
    `Sat1900` BOOLEAN NOT NULL DEFAULT false,
    `Sat2000` BOOLEAN NOT NULL DEFAULT false,
    `Sat2100` BOOLEAN NOT NULL DEFAULT false,
    `Sat2200` BOOLEAN NOT NULL DEFAULT false,
    `Sun0800` BOOLEAN NOT NULL DEFAULT false,
    `Sun0900` BOOLEAN NOT NULL DEFAULT false,
    `Sun1000` BOOLEAN NOT NULL DEFAULT false,
    `Sun1100` BOOLEAN NOT NULL DEFAULT false,
    `Sun1200` BOOLEAN NOT NULL DEFAULT false,
    `Sun1300` BOOLEAN NOT NULL DEFAULT false,
    `Sun1400` BOOLEAN NOT NULL DEFAULT false,
    `Sun1500` BOOLEAN NOT NULL DEFAULT false,
    `Sun1600` BOOLEAN NOT NULL DEFAULT false,
    `Sun1700` BOOLEAN NOT NULL DEFAULT false,
    `Sun1800` BOOLEAN NOT NULL DEFAULT false,
    `Sun1900` BOOLEAN NOT NULL DEFAULT false,
    `Sun2000` BOOLEAN NOT NULL DEFAULT false,
    `Sun2100` BOOLEAN NOT NULL DEFAULT false,
    `Sun2200` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subject` ADD CONSTRAINT `subject_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`userid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject` ADD CONSTRAINT `subject_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject` ADD CONSTRAINT `subject_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `student`(`studentid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `availtime` ADD CONSTRAINT `availtime_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `availtime` ADD CONSTRAINT `availtime_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `student`(`studentid`) ON DELETE SET NULL ON UPDATE CASCADE;
