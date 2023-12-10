/*
  Warnings:

  - You are about to drop the `gcealevel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hkale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hkcee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hkdse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ib` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `igcse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `gcealevel` DROP FOREIGN KEY `GCEALevel_tutorid_fkey`;

-- DropForeignKey
ALTER TABLE `hkale` DROP FOREIGN KEY `HKALE_tutorid_fkey`;

-- DropForeignKey
ALTER TABLE `hkcee` DROP FOREIGN KEY `HKCEE_tutorid_fkey`;

-- DropForeignKey
ALTER TABLE `hkdse` DROP FOREIGN KEY `HKDSE_tutorid_fkey`;

-- DropForeignKey
ALTER TABLE `ib` DROP FOREIGN KEY `IB_tutorid_fkey`;

-- DropForeignKey
ALTER TABLE `igcse` DROP FOREIGN KEY `IGCSE_tutorid_fkey`;

-- DropTable
DROP TABLE `gcealevel`;

-- DropTable
DROP TABLE `hkale`;

-- DropTable
DROP TABLE `hkcee`;

-- DropTable
DROP TABLE `hkdse`;

-- DropTable
DROP TABLE `ib`;

-- DropTable
DROP TABLE `igcse`;

-- CreateTable
CREATE TABLE `grade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tutorid` INTEGER NOT NULL,
    `HKCEE_ChineseLanguage` VARCHAR(10) NOT NULL,
    `HKCEE_EnglishLanguage` VARCHAR(10) NOT NULL,
    `HKCEE_Mathematics` VARCHAR(10) NOT NULL,
    `HKCEE_ChineseLiterature` VARCHAR(10) NOT NULL,
    `HKCEE_EnglishLiterature` VARCHAR(10) NOT NULL,
    `HKCEE_ChineseHistory` VARCHAR(10) NOT NULL,
    `HKCEE_WorldHistory` VARCHAR(10) NOT NULL,
    `HKCEE_Geography` VARCHAR(10) NOT NULL,
    `HKCEE_Music` VARCHAR(10) NOT NULL,
    `HKCEE_AdditionalMathematics` VARCHAR(10) NOT NULL,
    `HKCEE_Physics` VARCHAR(10) NOT NULL,
    `HKCEE_Biology` VARCHAR(10) NOT NULL,
    `HKCEE_Chemistry` VARCHAR(10) NOT NULL,
    `HKCEE_BusinessStudies` VARCHAR(10) NOT NULL,
    `HKCEE_PrinciplesofAccounts` VARCHAR(10) NOT NULL,
    `HKCEE_Economics` VARCHAR(10) NOT NULL,
    `HKCEE_ComputerStudies` VARCHAR(10) NOT NULL,
    `HKALE_ChineseLanguage` VARCHAR(10) NOT NULL,
    `HKALE_EnglishLanguage` VARCHAR(10) NOT NULL,
    `HKALE_Mathematics` VARCHAR(10) NOT NULL,
    `HKALE_ChineseLiterature` VARCHAR(10) NOT NULL,
    `HKALE_EnglishLiterature` VARCHAR(10) NOT NULL,
    `HKALE_ChineseHistory` VARCHAR(10) NOT NULL,
    `HKALE_WorldHistory` VARCHAR(10) NOT NULL,
    `HKALE_Geography` VARCHAR(10) NOT NULL,
    `HKALE_Music` VARCHAR(10) NOT NULL,
    `HKALE_AdditionalMathematics` VARCHAR(10) NOT NULL,
    `HKALE_Physics` VARCHAR(10) NOT NULL,
    `HKALE_Biology` VARCHAR(10) NOT NULL,
    `HKALE_Chemistry` VARCHAR(10) NOT NULL,
    `HKALE_BusinessStudies` VARCHAR(10) NOT NULL,
    `HKALE_PrinciplesofAccounts` VARCHAR(10) NOT NULL,
    `HKALE_Economics` VARCHAR(10) NOT NULL,
    `HKALE_ComputerStudies` VARCHAR(10) NOT NULL,
    `HKDSE_ChineseLanguage` VARCHAR(10) NOT NULL,
    `HKDSE_EnglishLanguage` VARCHAR(10) NOT NULL,
    `HKDSE_Mathematics` VARCHAR(10) NOT NULL,
    `HKDSE_LiberalStudies` VARCHAR(10) NOT NULL,
    `HKDSE_ChineseLiterature` VARCHAR(10) NOT NULL,
    `HKDSE_EnglishLiterature` VARCHAR(10) NOT NULL,
    `HKDSE_MathematicsM1` VARCHAR(10) NOT NULL,
    `HKDSE_MathematicsM2` VARCHAR(10) NOT NULL,
    `HKDSE_ChineseHistory` VARCHAR(10) NOT NULL,
    `HKDSE_Economics` VARCHAR(10) NOT NULL,
    `HKDSE_EthicsandReligiousStudies` VARCHAR(10) NOT NULL,
    `HKDSE_Geography` VARCHAR(10) NOT NULL,
    `HKDSE_History` VARCHAR(10) NOT NULL,
    `HKDSE_TourismandHospitalityStudies` VARCHAR(10) NOT NULL,
    `HKDSE_Biology` VARCHAR(10) NOT NULL,
    `HKDSE_Chemistry` VARCHAR(10) NOT NULL,
    `HKDSE_Physics` VARCHAR(10) NOT NULL,
    `HKDSE_IntegratedScienceCombinedScience` VARCHAR(10) NOT NULL,
    `HKDSE_IntegratedScienceIntegratedScience` VARCHAR(10) NOT NULL,
    `HKDSE_InformationandCommunicationTechnology` VARCHAR(10) NOT NULL,
    `HKDSE_TechnologyandLiving` VARCHAR(10) NOT NULL,
    `HKDSE_DesignandAppliedTechnology` VARCHAR(10) NOT NULL,
    `HKDSE_VisualArts` VARCHAR(10) NOT NULL,
    `HKDSE_Music` VARCHAR(10) NOT NULL,
    `HKDSE_PhysicalEducation` VARCHAR(10) NOT NULL,
    `HKDSE_BusinessAccountingandFinancialStudies` VARCHAR(10) NOT NULL,
    `HKDSE_HealthManagementandSocialCare` VARCHAR(10) NOT NULL,
    `HKDSE_OtherLanguagesFrench` VARCHAR(10) NOT NULL,
    `HKDSE_OtherLanguagesJapanese` VARCHAR(10) NOT NULL,
    `HKDSE_OtherLanguagesGerman` VARCHAR(10) NOT NULL,
    `HKDSE_OtherLanguagesSpanish` VARCHAR(10) NOT NULL,
    `HKDSE_OtherLanguagesHindi` VARCHAR(10) NOT NULL,
    `HKDSE_OtherLanguagesUrdu` VARCHAR(10) NOT NULL,
    `IB_LanguagesEnglishLanguageLiteratureSLHL` VARCHAR(10) NOT NULL,
    `IB_LanguagesEnglishLiteratureSLHL` VARCHAR(10) NOT NULL,
    `IB_LanguagesChineseALanguageLiteratureSL` VARCHAR(10) NOT NULL,
    `IB_LanguagesChineseALiteratureSL` VARCHAR(10) NOT NULL,
    `IB_LanguagesChineseBSLHL` VARCHAR(10) NOT NULL,
    `IB_MathematicsMathematics` VARCHAR(10) NOT NULL,
    `IB_MathematicsMathematicsSL` VARCHAR(10) NOT NULL,
    `IB_MathematicsMathematicsHL` VARCHAR(10) NOT NULL,
    `IB_MathematicsFurtherMathematicsHL` VARCHAR(10) NOT NULL,
    `IB_HumanitiesandSocialSciencesBusinessManagement` VARCHAR(10) NOT NULL,
    `IB_HumanitiesandSocialSciencesEconomics` VARCHAR(10) NOT NULL,
    `IB_HumanitiesandSocialSciencesGlobalPolitics` VARCHAR(10) NOT NULL,
    `IB_HumanitiesandSocialSciencesHistory` VARCHAR(10) NOT NULL,
    `IB_HumanitiesandSocialSciencesPhilosophy` VARCHAR(10) NOT NULL,
    `IB_HumanitiesandSocialSciencesPsychology` VARCHAR(10) NOT NULL,
    `IB_HumanitiesandSocialSciencesSocialandCulturalAnthropology` VARCHAR(10) NOT NULL,
    `IB_HumanitiesandSocialSciencesWorldReligionsSL` VARCHAR(10) NOT NULL,
    `IB_SciencesBiology` VARCHAR(10) NOT NULL,
    `IB_SciencesChemistry` VARCHAR(10) NOT NULL,
    `IB_SciencesPhysics` VARCHAR(10) NOT NULL,
    `IB_SciencesSportsExerciseandHealthScience` VARCHAR(10) NOT NULL,
    `IB_SciencesCreativeTechnicalandVocational` VARCHAR(10) NOT NULL,
    `IB_SciencesInformationTechnology` VARCHAR(10) NOT NULL,
    `IB_SciencesComputerScience` VARCHAR(10) NOT NULL,
    `IB_SciencesDesignTechnology` VARCHAR(10) NOT NULL,
    `IGCSE_LanguagesChinese` VARCHAR(10) NOT NULL,
    `IGCSE_LanguagesEnglishA` VARCHAR(10) NOT NULL,
    `IGCSE_LanguagesEnglishB` VARCHAR(10) NOT NULL,
    `IGCSE_LanguagesEnglishLiterature` VARCHAR(10) NOT NULL,
    `IGCSE_SciencesBiology` VARCHAR(10) NOT NULL,
    `IGCSE_SciencesChemistry` VARCHAR(10) NOT NULL,
    `IGCSE_SciencesPhysics` VARCHAR(10) NOT NULL,
    `IGCSE_SciencesScience` VARCHAR(10) NOT NULL,
    `IGCSE_SciencesGeography` VARCHAR(10) NOT NULL,
    `IGCSE_CreativeTechnicalandVocationalComputerScience` VARCHAR(10) NOT NULL,
    `IGCSE_CreativeTechnicalandVocationalDesignandTechnology` VARCHAR(10) NOT NULL,
    `IGCSE_MathematicsMathematicsA` VARCHAR(10) NOT NULL,
    `IGCSE_MathematicsMathematicsB` VARCHAR(10) NOT NULL,
    `IGCSE_MathematicsFurtherPureMathematics` VARCHAR(10) NOT NULL,
    `IGCSE_HumanitiesandSocialSciencesBusiness` VARCHAR(10) NOT NULL,
    `IGCSE_HumanitiesandSocialSciencesEconomics` VARCHAR(10) NOT NULL,
    `IGCSE_HumanitiesandSocialSciencesHistory` VARCHAR(10) NOT NULL,
    `IGCSE_HumanitiesandSocialSciencesAccounting` VARCHAR(10) NOT NULL,
    `GCEALevel_LanguagesEnglishLanguage` VARCHAR(10) NOT NULL,
    `GCEALevel_LanguagesEnglishLiterature` VARCHAR(10) NOT NULL,
    `GCEALevel_SciencesBiology` VARCHAR(10) NOT NULL,
    `GCEALevel_SciencesChemistry` VARCHAR(10) NOT NULL,
    `GCEALevel_SciencesPhysics` VARCHAR(10) NOT NULL,
    `GCEALevel_MathematicsMathematics` VARCHAR(10) NOT NULL,
    `GCEALevel_MathematicsFurtherMathematics` VARCHAR(10) NOT NULL,
    `GCEALevel_MathematicsPureMathematics` VARCHAR(10) NOT NULL,
    `GCEALevel_HumanitiesandSocialSciencesAccounting` VARCHAR(10) NOT NULL,
    `GCEALevel_HumanitiesandSocialSciencesBusinessStudies` VARCHAR(10) NOT NULL,
    `GCEALevel_HumanitiesandSocialSciencesEconomics` VARCHAR(10) NOT NULL,
    `GCEALevel_HumanitiesandSocialSciencesPsychology` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `grade` ADD CONSTRAINT `grade_tutorid_fkey` FOREIGN KEY (`tutorid`) REFERENCES `tutor`(`tutorid`) ON DELETE RESTRICT ON UPDATE CASCADE;
