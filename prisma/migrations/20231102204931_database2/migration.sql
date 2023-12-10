/*
  Warnings:

  - You are about to drop the column `userid` on the `student` table. All the data in the column will be lost.
  - Added the required column `userId` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student` DROP COLUMN `userid`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;
