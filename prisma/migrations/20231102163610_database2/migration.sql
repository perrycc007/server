/*
  Warnings:

  - You are about to alter the column `status` on the `matchstatus` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `matchstatus` MODIFY `status` ENUM('REJECTED', 'ASK_AGAIN', 'OPEN') NOT NULL;
