import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  async getResultByPage(page: number) {
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
      JOIN tutorperry. matchTable m ON s.studentid = m.studentid
      JOIN tutorperry. tutor t ON m.tutorid = t.tutorid
      JOIN tutorperry. profile pTutor ON t.userid = pTutor.userid
      JOIN tutorperry. profile pStudent ON s.userid = pStudent.userid
      LEFT JOIN tutorperry. tutorlocation tl ON t.tutorid = tl.tutorId
      LEFT JOIN tutorperry. location lTutor ON tl.locationId = lTutor.locationId
      LEFT JOIN tutorperry. tutorsubject ts ON t.tutorid = ts.tutorId
      LEFT JOIN tutorperry. subject subTutor ON ts.subjectId = subTutor.subjectId
      LEFT JOIN tutorperry. tutoravailtime ta ON t.tutorid = ta.tutorId
      LEFT JOIN tutorperry. availtime atTutor ON ta.availTimeId = atTutor.id
      LEFT JOIN tutorperry. studentlocation sl ON s.studentid = sl.studentId
      LEFT JOIN tutorperry. location lStudent ON sl.locationId = lStudent.locationId
      LEFT JOIN tutorperry. studentsubject ss ON s.studentid = ss.studentId
      LEFT JOIN tutorperry. subject subStudent ON ss.subjectId = subStudent.subjectId
      LEFT JOIN tutorperry. studentavailtime sa ON s.studentid = sa.studentId
      LEFT JOIN tutorperry. availtime atStudent ON sa.availTimeId = atStudent.id
      GROUP BY s.studentid, t.tutorid
      ORDER BY 
    s.lastOnline DESC
    LIMIT 5 OFFSET ${(page - 1) * 5}
 
    ;
    `;
    console.log(result);
    return result;
  }
  async getResultByStudentId(studentId: number, page: number) {
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
        'tutorId', t.tutorid,
        'userId', t.userid,
        'intro', t.intro,
        'language', t.language,
        'occupation', t.occupation,
        'secondarySchool', t.secondaryschool,
        'primarySchool', t.primaryschool,
        'yearOfExperience', t.yearofexperience,
        'experience', t.experience,
        'highestTeachingLevel', t.highestteachinglevel,
        'educationalLevel', t.educationallevel,
        'notes', t.notes,
        'schoolCat', t.schoolcat,
        'year', t.year,
        'publicExamGrade', t.publicexamgrade,
        'university', t.university,
        'otherCert', t.othercert,
        'caseId', t.caseid,
        'major', t.major,
        'subgrade', t.subgrade,
        'strength', t.strength,
        'highestFee', t.highestfee,
        'lowestFee', t.lowestfee,
        'matchedBefore', t.matchedbefore,
        'status', t.status,
        'lastOnline', t.lastOnline,
        'verify', t.verify,
        'completeFormStatus', t.completeFormStatus,
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
            'language', pTutor.language,
            'name', pTutor.name,
            'nationality', pTutor.nationality,
            'phoneNo', pTutor.phoneno,
            'lastOnline', pTutor.lastOnline
            -- Add other profile fields here if necessary
        ),
        'locations', GROUP_CONCAT(DISTINCT lTutor.location SEPARATOR ','),
        'subjects', GROUP_CONCAT(DISTINCT subTutor.name SEPARATOR ','),
        'availTimes', GROUP_CONCAT(DISTINCT CONCAT(atTutor.day, '-', atTutor.time) SEPARATOR ',')
    ) AS tutor,
    CAST(
        (SELECT COUNT(DISTINCT m2.idmatch) 
         FROM tutorperry.matchTable m2 
         WHERE m2.studentid = s.studentid) 
    AS SIGNED) AS total_counts

FROM 
    tutorperry.student s
    
JOIN 
    tutorperry.matchTable m ON s.studentid = m.studentid
JOIN 
    tutorperry.tutor t ON m.tutorid = t.tutorid
JOIN 
    tutorperry.profile pTutor ON t.userid = pTutor.userid
    JOIN tutorperry. profile pStudent ON s.userid = pStudent.userid
LEFT JOIN 
    tutorperry.tutorlocation tl ON t.tutorid = tl.tutorId
LEFT JOIN 
    tutorperry.location lTutor ON tl.locationId = lTutor.locationId
LEFT JOIN 
    tutorperry.tutorsubject ts ON t.tutorid = ts.tutorId
LEFT JOIN 
    tutorperry.subject subTutor ON ts.subjectId = subTutor.subjectId
LEFT JOIN 
    tutorperry.tutoravailtime ta ON t.tutorid = ta.tutorId
LEFT JOIN 
    tutorperry.availtime atTutor ON ta.availTimeId = atTutor.id

      LEFT JOIN tutorperry. studentlocation sl ON s.studentid = sl.studentId
      LEFT JOIN tutorperry. location lStudent ON sl.locationId = lStudent.locationId
      LEFT JOIN tutorperry. studentsubject ss ON s.studentid = ss.studentId
      LEFT JOIN tutorperry. subject subStudent ON ss.subjectId = subStudent.subjectId
      LEFT JOIN tutorperry. studentavailtime sa ON s.studentid = sa.studentId
      LEFT JOIN tutorperry. availtime atStudent ON sa.availTimeId = atStudent.id
      WHERE s.studentid = ${studentId}
      GROUP BY s.studentid,m.idmatch
      
      ORDER BY 
      t.lastOnline DESC
      LIMIT 5 OFFSET ${(page - 1) * 5};
      `;
    (result as Array<any>).forEach((item) => {
      item.total_counts = Number(item.total_counts);
    });
    console.log(result);
    return result;
  }

  async getResultByTutorId(tutorid: number, page: number) {
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
        'studentId', s.studentid,
        'language', s.language,
        'lowestFrequency', s.lowestfrequency,
        'lowestFee', s.lowestfee,
        'lowestDuration', s.lowestduration,
        'highestFee', s.highestfee,
        'highestFrequency', s.highestfrequency,
        'highestDuration', s.highestduration,
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
            -- Add other profile fields here if necessary
        ),
        'locations', GROUP_CONCAT(DISTINCT lStudent.location SEPARATOR ','),
        'subjects', GROUP_CONCAT(DISTINCT subStudent.name SEPARATOR ','),
        'availTimes', GROUP_CONCAT(DISTINCT CONCAT(atStudent.day, '-', atStudent.time) SEPARATOR ',')
    ) AS student
          FROM 
              tutorperry.tutor t
          JOIN 
              tutorperry.matchTable m ON t.tutorid = m.tutorid
          JOIN 
              tutorperry.student s ON m.studentid = s.studentid
          JOIN 
              tutorperry.profile pTutor ON t.userid = pTutor.userid
          JOIN 
              tutorperry.profile pStudent ON s.userid = pStudent.userid
          LEFT JOIN 
              tutorperry.tutorlocation tl ON t.tutorid = tl.tutorId
          LEFT JOIN 
              tutorperry.location lTutor ON tl.locationId = lTutor.locationId
          LEFT JOIN 
              tutorperry.tutorsubject ts ON t.tutorid = ts.tutorId
          LEFT JOIN 
              tutorperry.subject subTutor ON ts.subjectId = subTutor.subjectId
          LEFT JOIN 
              tutorperry.tutoravailtime ta ON t.tutorid = ta.tutorId
          LEFT JOIN 
              tutorperry.availtime atTutor ON ta.availTimeId = atTutor.id
          LEFT JOIN 
              tutorperry.studentlocation sl ON s.studentid = sl.studentId
          LEFT JOIN 
              tutorperry.location lStudent ON sl.locationId = lStudent.locationId
          LEFT JOIN 
              tutorperry.studentsubject ss ON s.studentid = ss.studentId
          LEFT JOIN 
              tutorperry.subject subStudent ON ss.subjectId = subStudent.subjectId
          LEFT JOIN 
              tutorperry.studentavailtime sa ON s.studentid = sa.studentId
          LEFT JOIN 
              tutorperry.availtime atStudent ON sa.availTimeId = atStudent.id
          WHERE 
              t.tutorid = ${tutorid} -- Ensure this value is safely injected
          GROUP BY 
    t.tutorid, m.idmatch;  
      ORDER BY 
      s.lastOnline DESC
      LIMIT 5 OFFSET ${(page - 1) * 5}
      `;

    console.log(result);
    (result as Array<any>).forEach((item) => {
      item.total_tutorials = Number(item.total_tutorials);
    });
    return result;
  }

  async getSortedStudentid() {
    const result = await this.prisma.$queryRaw`  SELECT 
    JSON_ARRAYAGG(s.studentid) AS studentIds
    
    FROM 
      tutorperry.student s
    WHERE
      status = 'OPEN'
    ORDER BY 
      lastOnline DESC;`;
    return result;
  }

  async getSortedTutortid() {
    const result = await this.prisma.$queryRaw`  SELECT 
      tutorid 
      COUNT(*) OVER() AS total_count
    FROM 
      tutorperry.tutor 
    WHERE
      status = 'OPEN'
    ORDER BY 
      lastOnline DESC;`;
    console.log(result);
    return result;
  }

  async closeLastOnlineMoreThan6months() {
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
  }
}
