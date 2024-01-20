/*
  Warnings:

  - You are about to drop the column `location` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `tutor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `student` DROP COLUMN `location`;

-- AlterTable
ALTER TABLE `tutor` DROP COLUMN `location`;

-- CreateTable
CREATE TABLE `location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NULL,
    `studentid` INTEGER NULL,
    `tutorid` INTEGER NULL,
    `Midlevels` BOOLEAN NOT NULL DEFAULT false,
    `Pokfulam` BOOLEAN NOT NULL DEFAULT false,
    `Central` BOOLEAN NOT NULL DEFAULT false,
    `Western` BOOLEAN NOT NULL DEFAULT false,
    `WanChai` BOOLEAN NOT NULL DEFAULT false,
    `CausewayBay` BOOLEAN NOT NULL DEFAULT false,
    `HappyValley` BOOLEAN NOT NULL DEFAULT false,
    `NorthPoint` BOOLEAN NOT NULL DEFAULT false,
    `QuarryBay` BOOLEAN NOT NULL DEFAULT false,
    `TaiKoo` BOOLEAN NOT NULL DEFAULT false,
    `ShauKeiWan` BOOLEAN NOT NULL DEFAULT false,
    `SaiWanHo` BOOLEAN NOT NULL DEFAULT false,
    `ChaiWan` BOOLEAN NOT NULL DEFAULT false,
    `SiuSaiWan` BOOLEAN NOT NULL DEFAULT false,
    `Aberdeen` BOOLEAN NOT NULL DEFAULT false,
    `ApLeiChau` BOOLEAN NOT NULL DEFAULT false,
    `Stanley` BOOLEAN NOT NULL DEFAULT false,
    `MeiFoo` BOOLEAN NOT NULL DEFAULT false,
    `LaiChiKok` BOOLEAN NOT NULL DEFAULT false,
    `CheungShaWan` BOOLEAN NOT NULL DEFAULT false,
    `ShamShuiPo` BOOLEAN NOT NULL DEFAULT false,
    `TaiKokTsui` BOOLEAN NOT NULL DEFAULT false,
    `MongKok` BOOLEAN NOT NULL DEFAULT false,
    `HoManTin` BOOLEAN NOT NULL DEFAULT false,
    `YauMaTei` BOOLEAN NOT NULL DEFAULT false,
    `TsimShaTsui` BOOLEAN NOT NULL DEFAULT false,
    `ToKwaWan` BOOLEAN NOT NULL DEFAULT false,
    `HungHom` BOOLEAN NOT NULL DEFAULT false,
    `Whampoa` BOOLEAN NOT NULL DEFAULT false,
    `LokFu` BOOLEAN NOT NULL DEFAULT false,
    `TseungKwanO` BOOLEAN NOT NULL DEFAULT false,
    `LamTin` BOOLEAN NOT NULL DEFAULT false,
    `NgauTauKok` BOOLEAN NOT NULL DEFAULT false,
    `KowloonCity` BOOLEAN NOT NULL DEFAULT false,
    `SheungShui` BOOLEAN NOT NULL DEFAULT false,
    `FanLing` BOOLEAN NOT NULL DEFAULT false,
    `TaiPo` BOOLEAN NOT NULL DEFAULT false,
    `MaOnShan` BOOLEAN NOT NULL DEFAULT false,
    `TseungKwanOArea` BOOLEAN NOT NULL DEFAULT false,
    `TuenMun` BOOLEAN NOT NULL DEFAULT false,
    `YuenLong` BOOLEAN NOT NULL DEFAULT false,
    `TuenMunRoad` BOOLEAN NOT NULL DEFAULT false,
    `ShamTseng` BOOLEAN NOT NULL DEFAULT false,
    `TsingYi` BOOLEAN NOT NULL DEFAULT false,
    `KwaiFong` BOOLEAN NOT NULL DEFAULT false,
    `KwaiChung` BOOLEAN NOT NULL DEFAULT false,
    `LaiKing` BOOLEAN NOT NULL DEFAULT false,
    `TsingYiIsland` BOOLEAN NOT NULL DEFAULT false,
    `MaWan` BOOLEAN NOT NULL DEFAULT false,
    `TungChung` BOOLEAN NOT NULL DEFAULT false,
    `OutlyingIslands` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NULL,
    `studentid` INTEGER NULL,
    `tutorid` INTEGER NULL,
    `GeneralStudies` BOOLEAN NOT NULL DEFAULT false,
    `Arts` BOOLEAN NOT NULL DEFAULT false,
    `Science` BOOLEAN NOT NULL DEFAULT false,
    `Business` BOOLEAN NOT NULL DEFAULT false,
    `Chinese` BOOLEAN NOT NULL DEFAULT false,
    `English` BOOLEAN NOT NULL DEFAULT false,
    `Mathematics` BOOLEAN NOT NULL DEFAULT false,
    `MathematicsM1` BOOLEAN NOT NULL DEFAULT false,
    `MathematicsM2` BOOLEAN NOT NULL DEFAULT false,
    `ChineseLiterature` BOOLEAN NOT NULL DEFAULT false,
    `EnglishLiterature` BOOLEAN NOT NULL DEFAULT false,
    `ChineseHistory` BOOLEAN NOT NULL DEFAULT false,
    `WorldHistory` BOOLEAN NOT NULL DEFAULT false,
    `Geography` BOOLEAN NOT NULL DEFAULT false,
    `LiberalStudies` BOOLEAN NOT NULL DEFAULT false,
    `IntegratedScience` BOOLEAN NOT NULL DEFAULT false,
    `IntegratedHumanities` BOOLEAN NOT NULL DEFAULT false,
    `AdditionalMathematics` BOOLEAN NOT NULL DEFAULT false,
    `PureMathematics` BOOLEAN NOT NULL DEFAULT false,
    `AppliedMathematics` BOOLEAN NOT NULL DEFAULT false,
    `Physics` BOOLEAN NOT NULL DEFAULT false,
    `Biology` BOOLEAN NOT NULL DEFAULT false,
    `Chemistry` BOOLEAN NOT NULL DEFAULT false,
    `BusinessStudies` BOOLEAN NOT NULL DEFAULT false,
    `Accounting` BOOLEAN NOT NULL DEFAULT false,
    `Economics` BOOLEAN NOT NULL DEFAULT false,
    `BusinessandPublicAffairs` BOOLEAN NOT NULL DEFAULT false,
    `MathematicsandStatistics` BOOLEAN NOT NULL DEFAULT false,
    `BAFS` BOOLEAN NOT NULL DEFAULT false,
    `Putonghua` BOOLEAN NOT NULL DEFAULT false,
    `Cantonese` BOOLEAN NOT NULL DEFAULT false,
    `EnglishPhonics` BOOLEAN NOT NULL DEFAULT false,
    `Japanese` BOOLEAN NOT NULL DEFAULT false,
    `Korean` BOOLEAN NOT NULL DEFAULT false,
    `French` BOOLEAN NOT NULL DEFAULT false,
    `Italian` BOOLEAN NOT NULL DEFAULT false,
    `German` BOOLEAN NOT NULL DEFAULT false,
    `Spanish` BOOLEAN NOT NULL DEFAULT false,
    `EnglishConversation` BOOLEAN NOT NULL DEFAULT false,
    `GCE` BOOLEAN NOT NULL DEFAULT false,
    `TOEFL` BOOLEAN NOT NULL DEFAULT false,
    `IELTS` BOOLEAN NOT NULL DEFAULT false,
    `Cello` BOOLEAN NOT NULL DEFAULT false,
    `Viola` BOOLEAN NOT NULL DEFAULT false,
    `Violin` BOOLEAN NOT NULL DEFAULT false,
    `Trumpet` BOOLEAN NOT NULL DEFAULT false,
    `Harmonica` BOOLEAN NOT NULL DEFAULT false,
    `Recorder` BOOLEAN NOT NULL DEFAULT false,
    `Flute` BOOLEAN NOT NULL DEFAULT false,
    `Ocarina` BOOLEAN NOT NULL DEFAULT false,
    `Clarinet` BOOLEAN NOT NULL DEFAULT false,
    `Saxophone` BOOLEAN NOT NULL DEFAULT false,
    `Erhu` BOOLEAN NOT NULL DEFAULT false,
    `Guzheng` BOOLEAN NOT NULL DEFAULT false,
    `Pipa` BOOLEAN NOT NULL DEFAULT false,
    `Yangqin` BOOLEAN NOT NULL DEFAULT false,
    `Liuqin` BOOLEAN NOT NULL DEFAULT false,
    `Guitar` BOOLEAN NOT NULL DEFAULT false,
    `AcousticGuitar` BOOLEAN NOT NULL DEFAULT false,
    `ElectricGuitar` BOOLEAN NOT NULL DEFAULT false,
    `ElectronicKeyboard` BOOLEAN NOT NULL DEFAULT false,
    `Piano` BOOLEAN NOT NULL DEFAULT false,
    `Vocal` BOOLEAN NOT NULL DEFAULT false,
    `MusicTheory` BOOLEAN NOT NULL DEFAULT false,
    `SwimmingFreestyle` BOOLEAN NOT NULL DEFAULT false,
    `SwimmingBackstroke` BOOLEAN NOT NULL DEFAULT false,
    `SwimmingBreaststroke` BOOLEAN NOT NULL DEFAULT false,
    `SwimmingButterfly` BOOLEAN NOT NULL DEFAULT false,
    `Painting` BOOLEAN NOT NULL DEFAULT false,
    `Computer` BOOLEAN NOT NULL DEFAULT false,
    `CambridgeEnglish` BOOLEAN NOT NULL DEFAULT false,
    `OlympiadMath` BOOLEAN NOT NULL DEFAULT false,
    `Abacus` BOOLEAN NOT NULL DEFAULT false,
    `KumanMath` BOOLEAN NOT NULL DEFAULT false,
    `IGCSE` BOOLEAN NOT NULL DEFAULT false,
    `IBOthers` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HKCEE` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tutorid` INTEGER NOT NULL,
    `ChineseLanguage` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `EnglishLanguage` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Mathematics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `ChineseLiterature` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `EnglishLiterature` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `ChineseHistory` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `WorldHistory` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Geography` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Music` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `AdditionalMathematics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Physics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Biology` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Chemistry` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `BusinessStudies` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `PrinciplesofAccounts` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Economics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `ComputerStudies` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HKALE` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tutorid` INTEGER NOT NULL,
    `ChineseLanguage` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `EnglishLanguage` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Mathematics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `ChineseLiterature` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `EnglishLiterature` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `ChineseHistory` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `WorldHistory` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Geography` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Music` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `AdditionalMathematics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Physics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Biology` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Chemistry` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `BusinessStudies` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `PrinciplesofAccounts` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `Economics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `ComputerStudies` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HKDSE` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tutorid` INTEGER NOT NULL,
    `ChineseLanguage` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `EnglishLanguage` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `Mathematics` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `LiberalStudies` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `ChineseLiterature` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `EnglishLiterature` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `MathematicsM1` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `MathematicsM2` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `ChineseHistory` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `Economics` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `EthicsandReligiousStudies` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `Geography` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `History` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `TourismandHospitalityStudies` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `Biology` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `Chemistry` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `Physics` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `IntegratedScienceCombinedScience` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `IntegratedScienceIntegratedScience` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `InformationandCommunicationTechnology` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `TechnologyandLiving` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `DesignandAppliedTechnology` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `VisualArts` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `Music` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `PhysicalEducation` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `BusinessAccountingandFinancialStudies` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `HealthManagementandSocialCare` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `OtherLanguagesFrench` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `OtherLanguagesJapanese` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `OtherLanguagesGerman` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `OtherLanguagesSpanish` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `OtherLanguagesHindi` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,
    `OtherLanguagesUrdu` ENUM('Value_2', 'Value_3', 'Value_4', 'Value_5', 'Value_5Star', 'Value_5DoubleStar') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IB` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tutorid` INTEGER NOT NULL,
    `LanguagesEnglishLanguageLiteratureSLHL` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `LanguagesEnglishLiteratureSLHL` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `LanguagesChineseALanguageLiteratureSL` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `LanguagesChineseALiteratureSL` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `LanguagesChineseBSLHL` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `MathematicsMathematics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `MathematicsMathematicsSL` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `MathematicsMathematicsHL` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `MathematicsFurtherMathematicsHL` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesBusinessManagement` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesEconomics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesGlobalPolitics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesHistory` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesPhilosophy` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesPsychology` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesSocialandCulturalAnthropology` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesWorldReligionsSL` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesBiology` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesChemistry` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesPhysics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesSportsExerciseandHealthScience` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesCreativeTechnicalandVocational` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesInformationTechnology` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesComputerScience` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesDesignTechnology` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IGCSE` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tutorid` INTEGER NOT NULL,
    `LanguagesChinese` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `LanguagesEnglishA` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `LanguagesEnglishB` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `LanguagesEnglishLiterature` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesBiology` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesChemistry` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesPhysics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesScience` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesGeography` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `CreativeTechnicalandVocationalComputerScience` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `CreativeTechnicalandVocationalDesignandTechnology` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `MathematicsMathematicsA` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `MathematicsMathematicsB` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `MathematicsFurtherPureMathematics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesBusiness` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesEconomics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesHistory` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesAccounting` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GCEALevel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tutorid` INTEGER NOT NULL,
    `LanguagesEnglishLanguage` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `LanguagesEnglishLiterature` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesBiology` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesChemistry` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `SciencesPhysics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `MathematicsMathematics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `MathematicsFurtherMathematics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `MathematicsPureMathematics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesAccounting` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesBusinessStudies` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesEconomics` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,
    `HumanitiesandSocialSciencesPsychology` ENUM('APlus', 'A', 'B', 'C', 'D', 'E', 'F') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`userid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `student`(`studentid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`userid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `student`(`studentid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HKCEE` ADD CONSTRAINT `HKCEE_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HKALE` ADD CONSTRAINT `HKALE_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HKDSE` ADD CONSTRAINT `HKDSE_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IB` ADD CONSTRAINT `IB_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IGCSE` ADD CONSTRAINT `IGCSE_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GCEALevel` ADD CONSTRAINT `GCEALevel_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE RESTRICT ON UPDATE CASCADE;
