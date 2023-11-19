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
    LIMIT 1 OFFSET ${page};`;
    console.log(result);
    return result;
  }
  async getResultByStudentId(studentId: number) {
    // Implement the logic for getting results by student ID
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
      WHERE s.studentid = ${studentId}
      ORDER BY 
      s.lastOnline DESC;`;

    console.log(result);
    return result;
  }

  async getResultByTutorId(tutorid: number) {
    // Implement the logic for getting results by student ID
    // You can reuse your existing logic from the Express router
    const result = await this.prisma.$queryRaw`
    SELECT 
    t.*, 
    s.*, 
    pTutor.*, 
    pStudent.*, 
    GROUP_CONCAT(DISTINCT lTutor.location SEPARATOR ',') AS tutorLocations,
    GROUP_CONCAT(DISTINCT subTutor.name SEPARATOR ',') AS tutorSubjects,
    GROUP_CONCAT(DISTINCT CONCAT(atTutor.day, '-', atTutor.time) SEPARATOR ',') AS tutorAvailTimes,
    GROUP_CONCAT(DISTINCT lStudent.location SEPARATOR ',') AS studentLocations,
    GROUP_CONCAT(DISTINCT subStudent.name SEPARATOR ',') AS studentSubjects,
    GROUP_CONCAT(DISTINCT CONCAT(atStudent.day, '-', atStudent.time) SEPARATOR ',') AS studentAvailTimes
      FROM tutorperry. tutor t
      JOIN tutorperry. matchTable m ON t.tutorid = m.tutorid
      JOIN tutorperry. student s ON m.studentid = s.studentid
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
      WHERE t.tutorid = ${tutorid}
      GROUP BY t.tutorid, s.studentid      
      ORDER BY 
      s.lastOnline DESC;`;

    console.log(result);
    return result;
  }

  async closeLastOnlineMoreThan6months() {
    await this.prisma.student.updateMany({
      where: {
        lastOnline: {
          lt: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
        },
        status: 'open',
      },
      data: {
        status: 'closed',
      },
    });
    await this.prisma.tutor.updateMany({
      where: {
        lastOnline: {
          lt: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
        },
        status: 'open',
      },
      data: {
        status: 'closed',
      },
    });
  }
}
