import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { isEqual } from 'lodash';
import { CheckStatus, MatchStatus } from '@prisma/client';
@Injectable()
export class MatchService {
  constructor(private readonly prisma: PrismaService) {}

  async matchTutor(req: any) {
    // Implement the matching system for tutors here
    // You can reuse your existing logic from the Express router

    try {
      const { locations, subjects, lowestfee, tutorid } = req.body.information;

      const students = await findMatchingStudents(
        locations,
        subjects,
        lowestfee,
      );
      const matchedStudentIds = students.map((student) => student.studentid);

      await this.prisma.match.updateMany({
        where: {
          tutorid: tutorid,
          NOT: {
            studentid: {
              in: matchedStudentIds,
            },
          },
        },
        data: {
          matchstatus: 'NO_LONGER_MATCH',
        },
      });
      await this.prisma.match.updateMany({
        where: {
          tutorid: tutorid,
          studentid: {
            in: matchedStudentIds,
          },
          OR: [{ matchstatus: 'REJECTED' }, { matchstatus: 'NO_LONGER_MATCH' }],
        },
        data: {
          matchstatus: 'ASK_AGAIN',
        },
      });

      const studentidOfExistingMatch = await this.prisma.match.findMany({
        where: {
          tutorid: tutorid,
          studentid: {
            in: matchedStudentIds,
          },
        },
        select: {
          studentid: true, // Include only the 'studentId' field in the result
        },
      });
      const difference = studentidOfExistingMatch.filter(
        (studentId) => !matchedStudentIds.includes(studentId.studentid),
      );
      if (difference.length !== 0) {
        const newRows = difference.map((onestudentid) => {
          return {
            tutorid: tutorid,
            studentid: onestudentid.studentid, // access the studentid property of the onestudentid object
            availability: true, // replace with actual value
            checkStatus: CheckStatus.NOT_YET_CHECKED, // replace with actual value
            matchstatus: MatchStatus.OPEN,
          };
        });

        await this.prisma.match.createMany({
          data: newRows,
        });
      }
      return { message: 'Tutor profile updated successfully.' };
    } catch (err) {
      console.log('Error: ', err.message);
      return { error: 'An error occurred while processing the tutor profile.' };
    }
  }

  async matchStudent(req: any) {
    // Implement the matching system for students here
    // You can reuse your existing logic from the Express router

    try {
      const { locations, subjects, highestfee, studentid } =
        req.body.information;

      const tutors = await findMatchingTutors(locations, subjects, highestfee);
      const matchedTutorIds = tutors.map((tutor) => tutor.tutorid);
      await this.prisma.match.updateMany({
        where: {
          studentid: studentid,
          NOT: {
            tutorid: {
              in: matchedTutorIds,
            },
          },
        },
        data: {
          matchstatus: 'NO_LONGER_MATCH',
        },
      });

      await this.prisma.match.updateMany({
        where: {
          studentid: studentid,
          tutorid: {
            in: matchedTutorIds,
          },
          OR: [{ matchstatus: 'REJECTED' }, { matchstatus: 'NO_LONGER_MATCH' }],
        },
        data: {
          matchstatus: 'ASK_AGAIN',
        },
      });

      const tutoridOfExistingMatch = await this.prisma.match.findMany({
        where: {
          studentid: studentid,
          tutorid: {
            in: matchedTutorIds,
          },
        },
        select: {
          tutorid: true, // Include only the 'studentId' field in the result
        },
      });
      const difference = tutoridOfExistingMatch.filter(
        (tutorId) => !matchedTutorIds.includes(tutorId.tutorid),
      );
      if (difference.length !== 0) {
        const newRows = difference.map((oneTutorId) => {
          return {
            studentid: studentid,
            tutorid: oneTutorId.tutorid, // access the studentid property of the onestudentid object
            availability: true, // replace with actual value
            checkStatus: CheckStatus.NOT_YET_CHECKED, // replace with actual value
            matchstatus: MatchStatus.OPEN,
          };
        });

        await this.prisma.match.createMany({
          data: newRows,
        });
      }

      return { message: 'Student request processed successfully.' };
    } catch (err) {
      console.log('Error: ', err.message);
      return {
        error: 'An error occurred while processing the student request.',
      };
    }
  }
}

async function findMatchingStudents(location, subject, lowestfee) {
  const lowestFee = this.DataService.LowestFeeQuery(lowestfee);
  const locationQuery = this.DataService.QueryBuilder(location, 'location');
  const subjectQuery = this.DataService.QueryBuilder(subject, 'subject');
  const result = await this.prisma.$queryRaw`
  SELECT 
    s.studentid
    s.lastOnline
    FROM
      tutorperry.student s
    LEFT JOIN
      tutorperry.studentLocation sl ON s.studentid = sl.studentid
    LEFT JOIN
      tutorperry.location l ON sl.locationId = l.locationId
    LEFT JOIN
      tutorperry.studentSubject ss ON s.studentid = ss.studentid
    LEFT JOIN
      tutorperry.subject su ON ss.subjectId = su.subjectId
      WHERE
      ${lowestFee}
      s.studentid IN (
        SELECT DISTINCT s.studentid
        FROM tutorperry.student s
        LEFT JOIN tutorperry.studentLocation sl ON s.studentid = sl.studentid
        LEFT JOIN tutorperry.location l ON sl.locationId = l.locationId
        LEFT JOIN tutorperry.studentSubject ss ON s.studentid = ss.studentid
        LEFT JOIN tutorperry.subject su ON ss.subjectId = su.subjectId
        WHERE
        ${locationQuery} AND
        ${subjectQuery}
      )
    GROUP BY
      s.studentid
    ORDER BY
      s.lastOnline DESC;
`;
  return result;
}

// Helper function to find matching tutors
async function findMatchingTutors(location, subject, highestFee) {
  const highestFeeQuery = this.DataService.LowestFeeQuery(highestFee);
  const locationQuery = this.DataService.QueryBuilder(location, 'location');
  const subjectQuery = this.DataService.QueryBuilder(subject, 'subject');
  const result = await this.prisma.$queryRaw`
  SELECT 
    t.tutorid
    t.lastOnline
    FROM 
    tutorperry.tutor t
LEFT JOIN 
    tutorperry.tutorLocation tl ON t.tutorid = tl.tutorId
LEFT JOIN 
    tutorperry.location l ON tl.locationId = l.locationId
LEFT JOIN
    tutorperry.tutorSubject ts ON t.tutorid = ts.tutorId
LEFT JOIN
    tutorperry.subject s ON ts.subjectId = s.subjectId
WHERE 
${highestFeeQuery}
t.tutorid IN (
  SELECT DISTINCT t.tutorid
  FROM tutorperry.tutor t
  LEFT JOIN tutorperry.tutorLocation tl ON t.tutorid = tl.tutorId
  LEFT JOIN tutorperry.location l ON tl.locationId = l.locationId
  LEFT JOIN tutorperry.tutorSubject ts ON t.tutorid = ts.tutorId
  LEFT JOIN tutorperry.subject s ON ts.subjectId = s.subjectId
  WHERE
  ${locationQuery} AND
  ${subjectQuery}
)
GROUP BY 
    t.tutorid
ORDER BY                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    t.lastOnline DESC;
`;

  return result;
}
