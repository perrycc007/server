-- CreateTable
CREATE TABLE `profile` (
    `idprofile` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `availtime` VARCHAR(600) NULL,
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

    UNIQUE INDEX `Profile_userId_key`(`userid`),
    PRIMARY KEY (`idprofile`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `userid` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(45) NOT NULL,
    `password` TINYTEXT NOT NULL,
    `favouritecaseid` JSON NULL,
    `favouritetutorid` JSON NULL,

    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `studentid` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NULL,
    `subject` VARCHAR(300) NULL,
    `availtime` VARCHAR(45) NULL,
    `lowestfrequency` INTEGER NULL,
    `lowestfee` INTEGER NULL,
    `lowestduration` INTEGER NULL,
    `language` VARCHAR(45) NULL,
    `others` VARCHAR(45) NULL,
    `expectation` VARCHAR(45) NULL,
    `genderrequirement` VARCHAR(45) NULL,
    `status` VARCHAR(45) NULL,
    `location` JSON NULL,
    `highestfee` INTEGER NULL,
    `highestfrequency` INTEGER NULL,
    `highestduration` INTEGER NULL,
    `level` VARCHAR(45) NULL,
    `lastOnline` DATETIME(0) NULL,

    PRIMARY KEY (`studentid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `apply` (
    `idapply` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(45) NOT NULL,
    `place` VARCHAR(45) NOT NULL,
    `userid` INTEGER NOT NULL,

    UNIQUE INDEX `Apply_userId_key`(`userid`),
    PRIMARY KEY (`idapply`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tutor` (
    `tutorid` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NULL,
    `location` JSON NULL,
    `availtime` VARCHAR(45) NULL,
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
    `caseid` VARCHAR(45) NULL,
    `major` VARCHAR(45) NULL,
    `subgrade` VARCHAR(2000) NULL,
    `strength` VARCHAR(45) NULL,
    `subject` JSON NULL,
    `highestfee` INTEGER NULL,
    `lowestfee` INTEGER NULL,
    `matchedbefore` JSON NULL,
    `status` VARCHAR(45) NULL DEFAULT 'open',
    `lastOnline` DATETIME(0) NULL,
    `verify` VARCHAR(45) NULL DEFAULT '未驗證',

    INDEX `tutor_userid_key_idx`(`userid`),
    PRIMARY KEY (`tutorid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match` (
    `idmatch` INTEGER NOT NULL AUTO_INCREMENT,
    `studentid` INTEGER NULL,
    `availtutor` JSON NULL,
    `notavailtutor` JSON NULL,
    `checking` JSON NULL,
    `checked` JSON NULL,
    `status` VARCHAR(45) NULL DEFAULT 'open',

    UNIQUE INDEX `studentid_UNIQUE`(`studentid`),
    PRIMARY KEY (`idmatch`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutor` ADD CONSTRAINT `tutor_userid_key` FOREIGN KEY (`userid`) REFERENCES `user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;
