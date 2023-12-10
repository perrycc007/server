/*
  Warnings:

  - You are about to alter the column `availtime` on the `tutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Json`.
  - You are about to alter the column `subgrade` on the `tutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2000)` to `Json`.

*/
-- AlterTable
ALTER TABLE `tutor` MODIFY `availtime` JSON NULL,
    MODIFY `subgrade` JSON NULL;
