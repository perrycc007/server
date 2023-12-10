/*
  Warnings:

  - You are about to drop the column `studentStudentid` on the `availtime` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `availtime` DROP FOREIGN KEY `AvailTime_studentStudentid_fkey`;

-- AlterTable
ALTER TABLE `availtime` DROP COLUMN `studentStudentid`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
