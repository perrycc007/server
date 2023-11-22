import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a PrismaService

@Injectable()
export class FavouriteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFavouriteTutor(userId: number) {
    const result = await this.prismaService.$queryRaw`
      SELECT 
      f.*,
      JSON_OBJECT(
          'tutorId', t.tutorId,
          'intro', t.intro,
          'language', t.language,
          'occupation', t.occupation,
          'yearOfExperience', t.yearofexperience,
          'highestTeachingLevel', t.highestteachinglevel,
          'educationallevel', t.educationallevel,
          'notes', t.notes,
          'profile', JSON_OBJECT(
              'profileId', pTutor.idprofile,
              'availTime', pTutor.availtime,
              'address', pTutor.address,
              'agreeWith', pTutor.agreewith,
              'country', pTutor.country,
              'emergencyContact', pTutor.emergencycontact,
              'emergencyPhone', pTutor.emergencyphone,
              'emergencyRelationship', pTutor.emergencyrelationship,
              'findUs', pTutor.findus,
              'name', pTutor.name,
              'nationality', pTutor.nationality,
              'phoneNo', pTutor.phoneno
              -- Add other tutor profile fields if necessary
          ),
          'locations', GROUP_CONCAT(DISTINCT lTutor.location SEPARATOR ','),
          'subjects', GROUP_CONCAT(DISTINCT subTutor.name SEPARATOR ','),
          'availTimes', GROUP_CONCAT(DISTINCT CONCAT(atTutor.day, '-', atTutor.time) SEPARATOR ',')
      ) AS tutor
  FROM 
      tutorperry.favourite f
  JOIN 
      tutorperry.tutor t ON f.tutorId = t.tutorId
  JOIN 
      tutorperry.profile pTutor ON t.userId = pTutor.userId
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
      f.idfavourite;`;
    return result;
  }

  async getFavouriterCase(userId: number) {
    const result = await this.prismaService.$queryRaw`
    SELECT 
    f.*,
    JSON_OBJECT(
        'studentId', s.studentId,
        'language', s.language,
        'lowestfrequency', s.lowestfrequency,
        'lowestfee', s.lowestfee,
        'lowestduration', s.lowestduration,
        'highestfee', s.highestfee,
        'highestfrequency', s.highestfrequency,
        'highestduration', s.highestduration,
        'level', s.level,
        'lastOnline', s.lastOnline,
        'status', s.status,
        'completeFormStatus', s.completeFormStatus,
        'profile', JSON_OBJECT(
            'profileId', pStudent.idprofile,
            'availTime', pStudent.availtime,
            'address', pStudent.address,
            'agreeWith', pStudent.agreewith,
            'country', pStudent.country,
            'emergencyContact', pStudent.emergencycontact,
            'emergencyPhone', pStudent.emergencyphone,
            'emergencyRelationship', pStudent.emergencyrelationship,
            'findUs', pStudent.findus,
            'name', pStudent.name,
            'nationality', pStudent.nationality,
            'phoneNo', pStudent.phoneno
            -- Add other student profile fields if necessary
        ),
        'locations', GROUP_CONCAT(DISTINCT lStudent.location SEPARATOR ','),
        'subjects', GROUP_CONCAT(DISTINCT subStudent.name SEPARATOR ','),
        'availTimes', GROUP_CONCAT(DISTINCT CONCAT(atStudent.day, '-', atStudent.time) SEPARATOR ',')
    ) AS student
FROM 
    tutorperry.favourite f
JOIN 
    tutorperry.student s ON f.studentId = s.studentId
JOIN 
    tutorperry.profile pStudent ON s.userId = pStudent.userId
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
    f.idfavourite;`;
    return result;
  }

  async addFavouriteStudent(userId: number, studentId: number) {
    return this.prismaService.favourite.create({
      data: {
        userId: userId,
        studentId: studentId,
      },
    });
  }

  async removeFavouriteStudent(userId: number, studentId: number) {
    await this.prismaService.favourite.deleteMany({
      where: {
        userId: userId,
        studentId: studentId,
      },
    });
  }

  async addFavouriteTutor(userId: number, tutorId: number) {
    return this.prismaService.favourite.create({
      data: {
        userId: userId,
        tutorId: tutorId,
      },
    });
  }

  async removeFavouriteTutor(userId: number, tutorId: number) {
    await this.prismaService.favourite.deleteMany({
      where: {
        userId: userId,
        tutorId: tutorId,
      },
    });
  }
}
