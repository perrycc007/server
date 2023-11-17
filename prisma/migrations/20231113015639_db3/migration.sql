/*
  Warnings:

  - You are about to drop the column `Central` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `Midlevels` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `NgauTauKok` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `SaiWanHo` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `TseungKwanOArea` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `TsingYiIsland` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `TuenMunRoad` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `Western` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `Whampoa` on the `location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `location` DROP COLUMN `Central`,
    DROP COLUMN `Midlevels`,
    DROP COLUMN `NgauTauKok`,
    DROP COLUMN `SaiWanHo`,
    DROP COLUMN `TseungKwanOArea`,
    DROP COLUMN `TsingYiIsland`,
    DROP COLUMN `TuenMunRoad`,
    DROP COLUMN `Western`,
    DROP COLUMN `Whampoa`,
    ADD COLUMN `CentralMidLevels` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ChoiHungAndNgauChiWan` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `DiamondHill` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `FoTan` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `Jordan` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `KowloonTong` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `KwunTong` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `LittleSaiWan` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `MidLevels` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `NgauTauKokAndKowloonBay` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `SaiKung` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `SaiYingPun` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `SanPoKong` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `SauMauPing` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ShaTin` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ShaTinTownCenter` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ShekKipMei` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `SiuLekYuen` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `TaiWai` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `TinShuiWai` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `TsingLungTau` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `TsuenWan` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `TszWanShan` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `WongTaiSin` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `YauTong` BOOLEAN NOT NULL DEFAULT false;
