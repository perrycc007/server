/*
  Warnings:

  - Made the column `GCEALevel_HumanitiesandSocialSciencesAccounting` on table `gcealevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `GCEALevel_HumanitiesandSocialSciencesBusinessStudies` on table `gcealevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `GCEALevel_HumanitiesandSocialSciencesEconomics` on table `gcealevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `GCEALevel_HumanitiesandSocialSciencesPsychology` on table `gcealevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `GCEALevel_LanguagesEnglishLanguage` on table `gcealevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `GCEALevel_LanguagesEnglishLiterature` on table `gcealevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `GCEALevel_MathematicsFurtherMathematics` on table `gcealevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `GCEALevel_MathematicsMathematics` on table `gcealevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `GCEALevel_MathematicsPureMathematics` on table `gcealevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `GCEALevel_SciencesBiology` on table `gcealevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `GCEALevel_SciencesChemistry` on table `gcealevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `GCEALevel_SciencesPhysics` on table `gcealevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_AdditionalMathematics` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_Biology` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_BusinessStudies` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_Chemistry` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_ChineseHistory` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_ChineseLanguage` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_ChineseLiterature` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_ComputerStudies` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_Economics` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_EnglishLanguage` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_EnglishLiterature` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_Geography` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_Mathematics` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_Music` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_Physics` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_PrinciplesofAccounts` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKALE_WorldHistory` on table `hkale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_AdditionalMathematics` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_Biology` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_BusinessStudies` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_Chemistry` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_ChineseHistory` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_ChineseLanguage` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_ChineseLiterature` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_ComputerStudies` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_Economics` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_EnglishLanguage` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_EnglishLiterature` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_Geography` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_Mathematics` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_Music` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_Physics` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_PrinciplesofAccounts` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKCEE_WorldHistory` on table `hkcee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_Biology` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_BusinessAccountingandFinancialStudies` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_Chemistry` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_ChineseHistory` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_ChineseLanguage` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_ChineseLiterature` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_DesignandAppliedTechnology` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_Economics` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_EnglishLanguage` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_EnglishLiterature` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_EthicsandReligiousStudies` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_Geography` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_HealthManagementandSocialCare` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_History` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_InformationandCommunicationTechnology` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_IntegratedScienceCombinedScience` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_IntegratedScienceIntegratedScience` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_LiberalStudies` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_Mathematics` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_MathematicsM1` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_MathematicsM2` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_Music` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_OtherLanguagesFrench` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_OtherLanguagesGerman` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_OtherLanguagesHindi` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_OtherLanguagesJapanese` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_OtherLanguagesSpanish` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_OtherLanguagesUrdu` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_PhysicalEducation` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_Physics` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_TechnologyandLiving` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_TourismandHospitalityStudies` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HKDSE_VisualArts` on table `hkdse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_HumanitiesandSocialSciencesBusinessManagement` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_HumanitiesandSocialSciencesEconomics` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_HumanitiesandSocialSciencesGlobalPolitics` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_HumanitiesandSocialSciencesHistory` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_HumanitiesandSocialSciencesPhilosophy` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_HumanitiesandSocialSciencesPsychology` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_HumanitiesandSocialSciencesSocialandCulturalAnthropology` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_HumanitiesandSocialSciencesWorldReligionsSL` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_LanguagesChineseALanguageLiteratureSL` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_LanguagesChineseALiteratureSL` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_LanguagesChineseBSLHL` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_LanguagesEnglishLanguageLiteratureSLHL` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_LanguagesEnglishLiteratureSLHL` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_MathematicsFurtherMathematicsHL` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_MathematicsMathematics` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_MathematicsMathematicsHL` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_MathematicsMathematicsSL` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_SciencesBiology` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_SciencesChemistry` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_SciencesComputerScience` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_SciencesCreativeTechnicalandVocational` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_SciencesDesignTechnology` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_SciencesInformationTechnology` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_SciencesPhysics` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IB_SciencesSportsExerciseandHealthScience` on table `ib` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_CreativeTechnicalandVocationalComputerScience` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_CreativeTechnicalandVocationalDesignandTechnology` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_HumanitiesandSocialSciencesAccounting` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_HumanitiesandSocialSciencesBusiness` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_HumanitiesandSocialSciencesEconomics` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_HumanitiesandSocialSciencesHistory` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_LanguagesChinese` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_LanguagesEnglishA` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_LanguagesEnglishB` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_LanguagesEnglishLiterature` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_MathematicsFurtherPureMathematics` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_MathematicsMathematicsA` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_MathematicsMathematicsB` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_SciencesBiology` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_SciencesChemistry` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_SciencesGeography` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_SciencesPhysics` on table `igcse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `IGCSE_SciencesScience` on table `igcse` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `gcealevel` MODIFY `GCEALevel_HumanitiesandSocialSciencesAccounting` VARCHAR(10) NOT NULL,
    MODIFY `GCEALevel_HumanitiesandSocialSciencesBusinessStudies` VARCHAR(10) NOT NULL,
    MODIFY `GCEALevel_HumanitiesandSocialSciencesEconomics` VARCHAR(10) NOT NULL,
    MODIFY `GCEALevel_HumanitiesandSocialSciencesPsychology` VARCHAR(10) NOT NULL,
    MODIFY `GCEALevel_LanguagesEnglishLanguage` VARCHAR(10) NOT NULL,
    MODIFY `GCEALevel_LanguagesEnglishLiterature` VARCHAR(10) NOT NULL,
    MODIFY `GCEALevel_MathematicsFurtherMathematics` VARCHAR(10) NOT NULL,
    MODIFY `GCEALevel_MathematicsMathematics` VARCHAR(10) NOT NULL,
    MODIFY `GCEALevel_MathematicsPureMathematics` VARCHAR(10) NOT NULL,
    MODIFY `GCEALevel_SciencesBiology` VARCHAR(10) NOT NULL,
    MODIFY `GCEALevel_SciencesChemistry` VARCHAR(10) NOT NULL,
    MODIFY `GCEALevel_SciencesPhysics` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `hkale` MODIFY `HKALE_AdditionalMathematics` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_Biology` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_BusinessStudies` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_Chemistry` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_ChineseHistory` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_ChineseLanguage` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_ChineseLiterature` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_ComputerStudies` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_Economics` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_EnglishLanguage` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_EnglishLiterature` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_Geography` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_Mathematics` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_Music` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_Physics` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_PrinciplesofAccounts` VARCHAR(10) NOT NULL,
    MODIFY `HKALE_WorldHistory` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `hkcee` MODIFY `HKCEE_AdditionalMathematics` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_Biology` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_BusinessStudies` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_Chemistry` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_ChineseHistory` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_ChineseLanguage` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_ChineseLiterature` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_ComputerStudies` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_Economics` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_EnglishLanguage` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_EnglishLiterature` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_Geography` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_Mathematics` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_Music` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_Physics` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_PrinciplesofAccounts` VARCHAR(10) NOT NULL,
    MODIFY `HKCEE_WorldHistory` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `hkdse` MODIFY `HKDSE_Biology` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_BusinessAccountingandFinancialStudies` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_Chemistry` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_ChineseHistory` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_ChineseLanguage` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_ChineseLiterature` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_DesignandAppliedTechnology` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_Economics` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_EnglishLanguage` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_EnglishLiterature` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_EthicsandReligiousStudies` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_Geography` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_HealthManagementandSocialCare` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_History` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_InformationandCommunicationTechnology` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_IntegratedScienceCombinedScience` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_IntegratedScienceIntegratedScience` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_LiberalStudies` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_Mathematics` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_MathematicsM1` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_MathematicsM2` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_Music` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_OtherLanguagesFrench` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_OtherLanguagesGerman` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_OtherLanguagesHindi` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_OtherLanguagesJapanese` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_OtherLanguagesSpanish` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_OtherLanguagesUrdu` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_PhysicalEducation` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_Physics` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_TechnologyandLiving` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_TourismandHospitalityStudies` VARCHAR(10) NOT NULL,
    MODIFY `HKDSE_VisualArts` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `ib` MODIFY `IB_HumanitiesandSocialSciencesBusinessManagement` VARCHAR(10) NOT NULL,
    MODIFY `IB_HumanitiesandSocialSciencesEconomics` VARCHAR(10) NOT NULL,
    MODIFY `IB_HumanitiesandSocialSciencesGlobalPolitics` VARCHAR(10) NOT NULL,
    MODIFY `IB_HumanitiesandSocialSciencesHistory` VARCHAR(10) NOT NULL,
    MODIFY `IB_HumanitiesandSocialSciencesPhilosophy` VARCHAR(10) NOT NULL,
    MODIFY `IB_HumanitiesandSocialSciencesPsychology` VARCHAR(10) NOT NULL,
    MODIFY `IB_HumanitiesandSocialSciencesSocialandCulturalAnthropology` VARCHAR(10) NOT NULL,
    MODIFY `IB_HumanitiesandSocialSciencesWorldReligionsSL` VARCHAR(10) NOT NULL,
    MODIFY `IB_LanguagesChineseALanguageLiteratureSL` VARCHAR(10) NOT NULL,
    MODIFY `IB_LanguagesChineseALiteratureSL` VARCHAR(10) NOT NULL,
    MODIFY `IB_LanguagesChineseBSLHL` VARCHAR(10) NOT NULL,
    MODIFY `IB_LanguagesEnglishLanguageLiteratureSLHL` VARCHAR(10) NOT NULL,
    MODIFY `IB_LanguagesEnglishLiteratureSLHL` VARCHAR(10) NOT NULL,
    MODIFY `IB_MathematicsFurtherMathematicsHL` VARCHAR(10) NOT NULL,
    MODIFY `IB_MathematicsMathematics` VARCHAR(10) NOT NULL,
    MODIFY `IB_MathematicsMathematicsHL` VARCHAR(10) NOT NULL,
    MODIFY `IB_MathematicsMathematicsSL` VARCHAR(10) NOT NULL,
    MODIFY `IB_SciencesBiology` VARCHAR(10) NOT NULL,
    MODIFY `IB_SciencesChemistry` VARCHAR(10) NOT NULL,
    MODIFY `IB_SciencesComputerScience` VARCHAR(10) NOT NULL,
    MODIFY `IB_SciencesCreativeTechnicalandVocational` VARCHAR(10) NOT NULL,
    MODIFY `IB_SciencesDesignTechnology` VARCHAR(10) NOT NULL,
    MODIFY `IB_SciencesInformationTechnology` VARCHAR(10) NOT NULL,
    MODIFY `IB_SciencesPhysics` VARCHAR(10) NOT NULL,
    MODIFY `IB_SciencesSportsExerciseandHealthScience` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `igcse` MODIFY `IGCSE_CreativeTechnicalandVocationalComputerScience` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_CreativeTechnicalandVocationalDesignandTechnology` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_HumanitiesandSocialSciencesAccounting` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_HumanitiesandSocialSciencesBusiness` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_HumanitiesandSocialSciencesEconomics` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_HumanitiesandSocialSciencesHistory` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_LanguagesChinese` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_LanguagesEnglishA` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_LanguagesEnglishB` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_LanguagesEnglishLiterature` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_MathematicsFurtherPureMathematics` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_MathematicsMathematicsA` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_MathematicsMathematicsB` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_SciencesBiology` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_SciencesChemistry` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_SciencesGeography` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_SciencesPhysics` VARCHAR(10) NOT NULL,
    MODIFY `IGCSE_SciencesScience` VARCHAR(10) NOT NULL;
