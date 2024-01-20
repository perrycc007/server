const newrelic = require('newrelic');
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Logger } from '@nestjs/common'; // Import Logger

@Injectable()
export class FavouriteService {
  private readonly logger = new Logger(FavouriteService.name); // Create a logger instance

  constructor(private readonly prismaService: PrismaService) {}

  async getFavouriteTutor(userId: number) {
    try {
      const result = await this.prismaService.$queryRaw`
      SELECT 
      f.*,
      'tutorId', t.tutorId,
      'intro', t.intro,
      'language', t.language,
      'occupation', t.occupation,
       'lowestfee', t.lowestfee,
     'highestfee',  t.highestfee,
      'yearOfExperience', t.yearofexperience,
      'highestTeachingLevel', t.highestteachinglevel,
      'educationallevel', t.educationallevel,
      'notes', t.notes,
       GROUP_CONCAT(DISTINCT lTutor.location SEPARATOR ',')AS locations,
       GROUP_CONCAT(DISTINCT subTutor.name SEPARATOR ',') AS subjects
  FROM 
      tutorperry.favourite f
  JOIN 
      tutorperry.tutor t ON f.tutorId = t.tutorId
  LEFT JOIN 
      tutorperry.tutorlocation tl ON t.tutorId = tl.tutorId
  LEFT JOIN 
      tutorperry.location lTutor ON tl.locationId = lTutor.locationId
  LEFT JOIN 
      tutorperry.tutorsubject ts ON t.tutorId = ts.tutorId
  LEFT JOIN 
      tutorperry.subject subTutor ON ts.subjectId = subTutor.subjectId
  LEFT JOIN 
      tutorperry.tutoravailtime ta ON t.tutorId = ta.tutorId
  LEFT JOIN 
      tutorperry.availtime atTutor ON ta.availTimeId = atTutor.id
  WHERE 
      f.userId = ${userId}
  GROUP BY 
      f.idfavourite;
      `;
      return result;
    } catch (error) {
      this.logger.error(`Error in getFavouriteTutor: ${error.message}`);
      throw error;
    }
  }

  async getFavouriterCase(userId: number) {
    try {
      const result = await this.prismaService.$queryRaw`
      SELECT 
      f.*,
      s.studentId AS studentId,
      s.language AS language,
      s.lowestfrequency AS lowestfrequency,
      s.lowestfee AS lowestfee,
      s.lowestduration AS lowestduration,
      s.highestfee AS highestfee,
      s.highestfrequency AS highestfrequency,
      s.highestduration AS highestduration,
      s.level AS level,
      s.lastOnline AS lastOnline,
      s.status AS status,
      GROUP_CONCAT(DISTINCT lStudent.location SEPARATOR ',') AS locations,
      GROUP_CONCAT(DISTINCT subStudent.name SEPARATOR ',') AS subjects
  FROM 
      tutorperry.favourite f
  JOIN 
      tutorperry.student s ON f.studentId = s.studentId
  LEFT JOIN 
      tutorperry.studentlocation sl ON s.studentId = sl.studentId
  LEFT JOIN 
      tutorperry.location lStudent ON sl.locationId = lStudent.locationId
  LEFT JOIN 
      tutorperry.studentsubject ss ON s.studentId = ss.studentId
  LEFT JOIN 
      tutorperry.subject subStudent ON ss.subjectId = subStudent.subjectId
  LEFT JOIN 
      tutorperry.studentavailtime sa ON s.studentId = sa.studentId
  LEFT JOIN 
      tutorperry.availtime atStudent ON sa.availTimeId = atStudent.id
  WHERE 
      f.userId = ${userId}
  GROUP BY 
      f.idfavourite;
  `;
      return result;
    } catch (error) {
      this.logger.error(`Error in getFavouriterCase: ${error.message}`);
      throw error;
    }
  }

  async addFavouriteStudent(userId: number, studentId: number) {
    try {
      return this.prismaService.favourite.create({
        data: {
          userId: userId,
          studentId: studentId,
        },
      });
    } catch (error) {
      this.logger.error(`Error in addFavouriteStudent: ${error.message}`);
      throw error;
    }
  }

  async removeFavouriteStudent(userId: number, studentId: number) {
    try {
      await this.prismaService.favourite.deleteMany({
        where: {
          userId: userId,
          studentId: studentId,
        },
      });
    } catch (error) {
      this.logger.error(`Error in removeFavouriteStudent: ${error.message}`);
      throw error;
    }
  }

  async addFavouriteTutor(userId: number, tutorId: number) {
    try {
      return this.prismaService.favourite.create({
        data: {
          userId: userId,
          tutorId: tutorId,
        },
      });
    } catch (error) {
      this.logger.error(`Error in addFavouriteTutor: ${error.message}`);
      throw error;
    }
  }

  async removeFavouriteTutor(userId: number, tutorId: number) {
    try {
      await this.prismaService.favourite.deleteMany({
        where: {
          userId: userId,
          tutorId: tutorId,
        },
      });
    } catch (error) {
      this.logger.error(`Error in removeFavouriteTutor: ${error.message}`);
      throw error;
    }
  }
}
