/*
  Warnings:

  - You are about to drop the column `grade` on the `grade` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `grade` DROP COLUMN `grade`;

-- AlterTable
ALTER TABLE `tutorgrade` ADD COLUMN `examGrade` VARCHAR(191) NULL;
