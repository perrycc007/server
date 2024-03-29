-- AlterTable
ALTER TABLE `grade` MODIFY `area` ENUM('LIBERAL_ARTS', 'SCIENCE', 'BUSINESS', 'CORE_SUBJECTS', 'ELECTIVE_SUBJECTS', 'OTHER_LANGUAGE_SUBJECTS', 'LANGUAGES', 'MATHEMATICS', 'HUMANITIES_AND_SOCIAL_SCIENCES', 'CREATIVE_TECHNICAL_AND_VOCATIONAL') NOT NULL;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `completeFormStatus` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `tutor` ADD COLUMN `completeFormStatus` BOOLEAN NOT NULL DEFAULT false;
