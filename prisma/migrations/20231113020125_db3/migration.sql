/*
  Warnings:

  - You are about to drop the column `MidLevels` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `Pokfulam` on the `location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `location` DROP COLUMN `MidLevels`,
    DROP COLUMN `Pokfulam`,
    ADD COLUMN `Central` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `MidLevelsCentral` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `NgauTauKok` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `PokFuLam` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `SaiWanHo` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `TseungKwanOArea` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `TsingYiIsland` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `TuenMunRoad` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `Western` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `Whampoa` BOOLEAN NOT NULL DEFAULT false;
