-- CreateTable
CREATE TABLE `profile` (
    `idprofile` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `address` VARCHAR(45) NULL,
    `agreewith` VARCHAR(45) NULL,
    `country` VARCHAR(45) NULL,
    `emergencycontact` VARCHAR(45) NULL,
    `emergencyphone` VARCHAR(45) NULL,
    `emergencyrelationship` VARCHAR(45) NULL,
    `findus` VARCHAR(45) NULL,
    `language` VARCHAR(45) NULL,
    `name` VARCHAR(45) NULL,
    `nationality` VARCHAR(45) NULL,
    `phoneno` VARCHAR(45) NULL,
    `lastOnline` DATETIME(0) NULL,
    `completeFormStatus` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `profile_userid_key`(`userId`),
    PRIMARY KEY (`idprofile`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(45) NOT NULL,
    `password` TINYTEXT NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `favouritetutorid` JSON NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favourite` (
    `idfavourite` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `studentId` INTEGER NULL,
    `tutorId` INTEGER NULL,

    INDEX `favourite_studentId_fkey`(`studentId`),
    INDEX `favourite_tutorId_fkey`(`tutorId`),
    INDEX `favourite_userId_fkey`(`userId`),
    PRIMARY KEY (`idfavourite`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `studentId` INTEGER NOT NULL AUTO_INCREMENT,
    `lowestfrequency` INTEGER NULL,
    `lowestfee` INTEGER NULL,
    `lowestduration` INTEGER NULL,
    `language` VARCHAR(45) NULL,
    `others` VARCHAR(45) NULL,
    `expectation` VARCHAR(45) NULL,
    `genderrequirement` VARCHAR(45) NULL,
    `status` ENUM('CLOSE', 'OPEN', 'BLOCKED') NOT NULL DEFAULT 'OPEN',
    `highestfee` INTEGER NULL,
    `highestfrequency` INTEGER NULL,
    `highestduration` INTEGER NULL,
    `level` VARCHAR(45) NULL,
    `lastOnline` DATETIME(0) NULL,
    `userId` INTEGER NOT NULL,
    `completeFormStatus` BOOLEAN NOT NULL DEFAULT false,

    INDEX `student_userId_fkey`(`userId`),
    PRIMARY KEY (`studentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tutor` (
    `tutorId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `intro` VARCHAR(45) NULL,
    `language` VARCHAR(45) NULL,
    `occupation` VARCHAR(45) NULL,
    `secondaryschool` VARCHAR(45) NULL,
    `primaryschool` VARCHAR(45) NULL,
    `yearofexperience` VARCHAR(45) NULL,
    `experience` VARCHAR(45) NULL,
    `highestteachinglevel` VARCHAR(45) NULL,
    `educationallevel` VARCHAR(45) NULL,
    `notes` VARCHAR(45) NULL,
    `schoolcat` VARCHAR(45) NULL,
    `year` VARCHAR(45) NULL,
    `publicexamgrade` VARCHAR(45) NULL,
    `university` VARCHAR(45) NULL,
    `othercert` VARCHAR(45) NULL,
    `major` VARCHAR(45) NULL,
    `subgrade` JSON NULL,
    `strength` VARCHAR(45) NULL,
    `highestfee` INTEGER NULL,
    `lowestfee` INTEGER NULL,
    `matchedbefore` JSON NULL,
    `status` ENUM('CLOSE', 'OPEN', 'BLOCKED') NOT NULL DEFAULT 'OPEN',
    `lastOnline` DATETIME(0) NULL,
    `verify` VARCHAR(45) NULL DEFAULT '未驗證',
    `completeFormStatus` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `tutor_userid_key`(`userId`),
    INDEX `tutor_userId_key_idx`(`userId`),
    PRIMARY KEY (`tutorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `location` VARCHAR(191) NULL,
    `locationId` INTEGER NOT NULL AUTO_INCREMENT,
    `region` VARCHAR(191) NULL,

    PRIMARY KEY (`locationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `availtime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` ENUM('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN') NOT NULL,
    `time` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `area` ENUM('LIBERAL_ARTS', 'SCIENCE', 'BUSINESS', 'CORE_SUBJECTS', 'ELECTIVE_SUBJECTS', 'OTHER_LANGUAGE_SUBJECTS', 'LANGUAGES', 'MATHEMATICS', 'HUMANITIES_AND_SOCIAL_SCIENCES', 'CREATIVE_TECHNICAL_AND_VOCATIONAL') NOT NULL,
    `examtype` ENUM('HKDSE', 'HKCEE', 'IB', 'HKALE', 'GCEALevel', 'IGCSE') NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `subjectKey` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studentavailtime` (
    `studentId` INTEGER NOT NULL,
    `availTimeId` INTEGER NOT NULL,

    INDEX `StudentAvailTime_availTimeId_fkey`(`availTimeId`),
    PRIMARY KEY (`studentId`, `availTimeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studentlocation` (
    `studentId` INTEGER NOT NULL,
    `locationId` INTEGER NOT NULL,

    INDEX `studentLocation_locationId_fkey`(`locationId`),
    PRIMARY KEY (`studentId`, `locationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studentsubject` (
    `studentId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,

    INDEX `StudentSubject_subjectId_fkey`(`subjectId`),
    PRIMARY KEY (`studentId`, `subjectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject` (
    `category` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `subjectId` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`subjectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tutoravailtime` (
    `tutorId` INTEGER NOT NULL,
    `availTimeId` INTEGER NOT NULL,

    INDEX `TutorAvailTime_availTimeId_fkey`(`availTimeId`),
    PRIMARY KEY (`tutorId`, `availTimeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tutorgrade` (
    `tutorId` INTEGER NOT NULL,
    `gradeId` INTEGER NOT NULL,
    `examGrade` VARCHAR(191) NULL,

    INDEX `TutorGrade_gradeId_fkey`(`gradeId`),
    PRIMARY KEY (`tutorId`, `gradeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tutorlocation` (
    `tutorId` INTEGER NOT NULL,
    `locationId` INTEGER NOT NULL,

    INDEX `tutorLocation_locationId_fkey`(`locationId`),
    PRIMARY KEY (`tutorId`, `locationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tutorsubject` (
    `tutorId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,

    INDEX `TutorSubject_subjectId_fkey`(`subjectId`),
    PRIMARY KEY (`tutorId`, `subjectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matchtable` (
    `idmatch` INTEGER NOT NULL AUTO_INCREMENT,
    `availability` BOOLEAN NOT NULL DEFAULT true,
    `checkStatus` ENUM('NOT_YET_CHECKED', 'CHECKING', 'CHECKED') NOT NULL DEFAULT 'NOT_YET_CHECKED',
    `matchstatus` ENUM('REJECTED', 'ASK_AGAIN', 'NO_LONGER_MATCH', 'OPEN') NOT NULL DEFAULT 'OPEN',
    `studentId` INTEGER NOT NULL,
    `tutorId` INTEGER NOT NULL,

    INDEX `matchtable_studentId_fkey`(`studentId`),
    INDEX `matchtable_tutorId_fkey`(`tutorId`),
    PRIMARY KEY (`idmatch`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favourite` ADD CONSTRAINT `favourite_userid_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutor` ADD CONSTRAINT `tutor_userid_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentavailtime` ADD CONSTRAINT `StudentAvailTime_availTimeId_fkey` FOREIGN KEY (`availTimeId`) REFERENCES `availtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentavailtime` ADD CONSTRAINT `StudentAvailTime_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`studentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentlocation` ADD CONSTRAINT `studentLocation_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `location`(`locationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentlocation` ADD CONSTRAINT `studentLocation_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`studentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentsubject` ADD CONSTRAINT `StudentSubject_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`studentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentsubject` ADD CONSTRAINT `StudentSubject_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`subjectId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutoravailtime` ADD CONSTRAINT `TutorAvailTime_availTimeId_fkey` FOREIGN KEY (`availTimeId`) REFERENCES `availtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutoravailtime` ADD CONSTRAINT `TutorAvailTime_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `tutor`(`tutorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutorgrade` ADD CONSTRAINT `TutorGrade_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `grade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutorgrade` ADD CONSTRAINT `TutorGrade_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `tutor`(`tutorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutorlocation` ADD CONSTRAINT `tutorLocation_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `location`(`locationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutorlocation` ADD CONSTRAINT `tutorLocation_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `tutor`(`tutorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutorsubject` ADD CONSTRAINT `TutorSubject_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`subjectId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutorsubject` ADD CONSTRAINT `TutorSubject_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `tutor`(`tutorId`) ON DELETE RESTRICT ON UPDATE CASCADE;
