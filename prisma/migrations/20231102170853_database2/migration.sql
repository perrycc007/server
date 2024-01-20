/*
  Warnings:

  - You are about to drop the `matchstatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `matchstatus` to the `match` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `matchstatus` DROP FOREIGN KEY `matchStatus_studentid_fkey`;

-- AlterTable
ALTER TABLE `match` ADD COLUMN `matchstatus` ENUM('REJECTED', 'ASK_AGAIN', 'NO_LONGER_MATCH', 'OPEN') NOT NULL;

-- DropTable
DROP TABLE `matchstatus`;
