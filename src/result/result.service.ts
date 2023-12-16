import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  async getResultByPage(page: number) {
    try {
      // Implement the logic for getting results by page
      // You can reuse your existing logic from the Express router
      const result = await this.prisma.$queryRaw`
    SELECT 
    s.*, 
    t.*, 
    pTutor.*, 
    pStudent.*, 
    GROUP_CONCAT(DISTINCT lTutor.location SEPARATOR ',') AS tutorLocations,
    GROUP_CONCAT(DISTINCT subTutor.name SEPARATOR ',') AS tutorSubjects,
    GROUP_CONCAT(DISTINCT CONCAT(atTutor.day, '-', atTutor.time) SEPARATOR ',') AS tutorAvailTimes,
    GROUP_CONCAT(DISTINCT lStudent.location SEPARATOR ',') AS studentLocations,
    GROUP_CONCAT(DISTINCT subStudent.name SEPARATOR ',') AS studentSubjects,
    GROUP_CONCAT(DISTINCT CONCAT(atStudent.day, '-', atStudent.time) SEPARATOR ',') AS studentAvailTimes
      FROM tutorperry. student s
      JOIN tutorperry. matchTable m ON s.studentId = m.studentId
      JOIN tutorperry. tutor t ON m.tutorId = t.tutorId
      JOIN tutorperry. profile pTutor ON t.userId = pTutor.userId
      JOIN tutorperry. profile pStudent ON s.userId = pStudent.userId
      LEFT JOIN tutorperry. tutorlocation tl ON t.tutorId = tl.tutorId
      LEFT JOIN tutorperry. location lTutor ON tl.locationId = lTutor.locationId
      LEFT JOIN tutorperry. tutorsubject ts ON t.tutorId = ts.tutorId
      LEFT JOIN tutorperry. subject subTutor ON ts.subjectId = subTutor.subjectId
      LEFT JOIN tutorperry. tutoravailtime ta ON t.tutorId = ta.tutorId
      LEFT JOIN tutorperry. availtime atTutor ON ta.availTimeId = atTutor.id
      LEFT JOIN tutorperry. studentlocation sl ON s.studentId = sl.studentId
      LEFT JOIN tutorperry. location lStudent ON sl.locationId = lStudent.locationId
      LEFT JOIN tutorperry. studentsubject ss ON s.studentId = ss.studentId
      LEFT JOIN tutorperry. subject subStudent ON ss.subjectId = subStudent.subjectId
      LEFT JOIN tutorperry. studentavailtime sa ON s.studentId = sa.studentId
      LEFT JOIN tutorperry. availtime atStudent ON sa.availTimeId = atStudent.id
      GROUP BY s.studentId, t.tutorId
      ORDER BY 
    s.lastOnline DESC
    LIMIT 5 OFFSET ${(page - 1) * 5}
 
    ;
    `;
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to get results by page',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getResultByStudentId(studentId: number, page: number) {
    try {
      // Implement the logic for getting results by student ID
      // You can reuse your existing logic from the Express router
      const result = await this.prisma.$queryRaw`
    SELECT 
    s.*,
    pStudent.*, 
    m.*,
    GROUP_CONCAT(DISTINCT lStudent.location SEPARATOR ',') AS studentLocations,
    GROUP_CONCAT(DISTINCT subStudent.name SEPARATOR ',') AS studentSubjects,
    GROUP_CONCAT(DISTINCT CONCAT(atStudent.day, '-', atStudent.time) SEPARATOR ',') AS studentAvailTimes,
    JSON_OBJECT(
        'tutorId', t.tutorId,
        'userId', t.userId,
        'intro', t.intro,
        'language', t.language,
        'occupation', t.occupation,
        'secondaryschool', t.secondaryschool,
        'primaryschool', t.primaryschool,
        'yearofexperience', t.yearofexperience,
        'experience', t.experience,
        'highestteachinglevel', t.highestteachinglevel,
        'educationallevel', t.educationallevel,
        'notes', t.notes,
        'schoolcat', t.schoolcat,
        'year', t.year,
        'publicexamgrade', t.publicexamgrade,
        'university', t.university,
        'othercert', t.othercert,
        'major', t.major,
        'subjectGrade', (
          SELECT JSON_OBJECTAGG(g.subjectkey, tg.examGrade) 
          FROM tutorperry.tutorgrade tg
          JOIN tutorperry.grade g ON tg.gradeId = g.id
          WHERE tg.tutorId = t.tutorId
        ),
        'strength', t.strength,
        'highestfee', t.highestfee,
        'lowestfee', t.lowestfee,
        'matchedbefore', t.matchedbefore,
        'status', t.status,
        'lastOnline', t.lastOnline,
        'verify', t.verify,
        'completeFormStatus', t.completeFormStatus,
        'profile', JSON_OBJECT(
            'profileId', pTutor.idprofile,
            'availtimes', pTutor.availtime,
            'address', pTutor.address,
            'agreeWith', pTutor.agreewith,
            'country', pTutor.country,
            'emergencycontact', pTutor.emergencycontact,
            'emergencyphone', pTutor.emergencyphone,
            'emergencyrelationship', pTutor.emergencyrelationship,
            'findus', pTutor.findus,
            'language', pTutor.language,
            'name', pTutor.name,
            'nationality', pTutor.nationality,
            'phoneno', pTutor.phoneno,
            'lastOnline', pTutor.lastOnline
            -- Add other profile fields here if necessary
        ),
        'locations', GROUP_CONCAT(DISTINCT lTutor.location SEPARATOR ','),
        'subjects', GROUP_CONCAT(DISTINCT subTutor.name SEPARATOR ','),
        'availtimes', GROUP_CONCAT(DISTINCT CONCAT(atTutor.day, '-', atTutor.time) SEPARATOR ',')
    ) AS tutor,
    CAST(
        (SELECT COUNT(DISTINCT m2.idmatch) 
         FROM tutorperry.matchTable m2 
         WHERE m2.studentId = s.studentId) 
    AS SIGNED) AS total_counts

FROM 
    tutorperry.student s
    
JOIN 
    tutorperry.matchTable m ON s.studentId = m.studentId
JOIN 
    tutorperry.tutor t ON m.tutorId = t.tutorId
JOIN 
    tutorperry.profile pTutor ON t.userId = pTutor.userId
    JOIN tutorperry. profile pStudent ON s.userId = pStudent.userId
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

      LEFT JOIN tutorperry. studentlocation sl ON s.studentId = sl.studentId
      LEFT JOIN tutorperry. location lStudent ON sl.locationId = lStudent.locationId
      LEFT JOIN tutorperry. studentsubject ss ON s.studentId = ss.studentId
      LEFT JOIN tutorperry. subject subStudent ON ss.subjectId = subStudent.subjectId
      LEFT JOIN tutorperry. studentavailtime sa ON s.studentId = sa.studentId
      LEFT JOIN tutorperry. availtime atStudent ON sa.availTimeId = atStudent.id
      WHERE 
      s.studentId = ${studentId} AND m.matchStatus != 'NO_LONGER_MATCH'
      GROUP BY s.studentId,m.idmatch
      
      ORDER BY 
      t.lastOnline DESC
      LIMIT 5 OFFSET ${(page - 1) * 5};
      `;
      (result as Array<any>).forEach((item) => {
        item.total_counts = Number(item.total_counts);
      });
      console.log(result);
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to get results by student ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getResultBytutorId(tutorId: number, page: number) {
    try {
      // Implement the logic for getting results by student ID
      // You can reuse your existing logic from the Express router
      const result = await this.prisma.$queryRaw`
    SELECT 
    t.*,
    m.*,
    pTutor.*,
    GROUP_CONCAT(DISTINCT lTutor.location SEPARATOR ',') AS tutorLocations,
    GROUP_CONCAT(DISTINCT subTutor.name SEPARATOR ',') AS tutorSubjects,
    GROUP_CONCAT(DISTINCT CONCAT(atTutor.day, '-', atTutor.time) SEPARATOR ',') AS tutorAvailTimes,

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
            'agreewith', pStudent.agreewith,
            'country', pStudent.country,
            'emergencycontact', pStudent.emergencycontact,
            'emergencyphone', pStudent.emergencyphone,
            'emergencyrelationship', pStudent.emergencyrelationship,
            'findus', pStudent.findus,
            'name', pStudent.name,
            'nationality', pStudent.nationality,
            'phoneno', pStudent.phoneno
            -- Add other profile fields here if necessary
        ),
        'locations', GROUP_CONCAT(DISTINCT lStudent.location SEPARATOR ','),
        'subjects', GROUP_CONCAT(DISTINCT subStudent.name SEPARATOR ','),
        'availTimes', GROUP_CONCAT(DISTINCT CONCAT(atStudent.day, '-', atStudent.time) SEPARATOR ',')
    ) AS student
          FROM 
              tutorperry.tutor t
          JOIN 
              tutorperry.matchTable m ON t.tutorId = m.tutorId
          JOIN 
              tutorperry.student s ON m.studentId = s.studentId
          JOIN 
              tutorperry.profile pTutor ON t.userId = pTutor.userId
          JOIN 
              tutorperry.profile pStudent ON s.userId = pStudent.userId
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
              t.tutorId = ${tutorId} -- Ensure this value is safely injected
          GROUP BY 
    t.tutorId, m.idmatch;  
      ORDER BY 
      s.lastOnline DESC
      LIMIT 5 OFFSET ${(page - 1) * 5}
      `;

      console.log(result);
      (result as Array<any>).forEach((item) => {
        item.total_tutorials = Number(item.total_tutorials);
      });
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to get results by tutor ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSortedStudentId() {
    try {
      const result = await this.prisma.$queryRaw`  SELECT 
    JSON_ARRAYAGG(s.studentId) AS studentIds
    FROM 
      tutorperry.student s
    WHERE
      status = 'OPEN'
    ORDER BY 
      lastOnline DESC;`;
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to get sorted student IDs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSortedTutortid() {
    try {
      const result = await this.prisma.$queryRaw`  SELECT 
      tutorId 
      COUNT(*) OVER() AS total_count
    FROM 
      tutorperry.tutor 
    WHERE
      status = 'OPEN'
    ORDER BY 
      lastOnline DESC;`;
      console.log(result);
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to get sorted tutor IDs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async closeLastOnlineMoreThan6months() {
    try {
      await this.prisma.student.updateMany({
        where: {
          lastOnline: {
            lt: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
          },
          status: 'OPEN',
        },
        data: {
          status: 'CLOSE',
        },
      });
      await this.prisma.tutor.updateMany({
        where: {
          lastOnline: {
            lt: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
          },
          status: 'OPEN',
        },
        data: {
          status: 'CLOSE',
        },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to close profiles last online more than 6 months',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
