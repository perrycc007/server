import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { isEqual } from 'lodash';
@Injectable()
export class MatchService {
  constructor(private readonly prisma: PrismaService) {}

  async matchTutor(req: any) {
    enum matchtable_checkStatus {
      NOT_YET_CHECKED,
      CHECKING,
      CHECKED,
    }

    enum matchtable_matchstatus {
      REJECTED,
      ASK_AGAIN,
      NO_LONGER_MATCH,
      OPEN,
    }
    // Implement the matching system for tutors here
    // You can reuse your existing logic from the Express router

    try {
      const { locations, subjects, lowestfee, tutorId } = req.body.information;

      const students = await findMatchingStudents(
        locations,
        subjects,
        lowestfee,
      );
      const matchedstudentIds = students.map((student) => student.studentId);
      const studentIdOfExistingMatch = await this.prisma.matchtable.findMany({
        where: {
          tutorId: tutorId,
          studentId: {
            in: matchedstudentIds,
          },
        },
        select: {
          studentId: true, // Include only the 'studentId' field in the result
        },
      });
      const difference = studentIdOfExistingMatch.filter(
        (studentId) => !matchedstudentIds.includes(studentId),
      );

      await this.prisma.$transaction(async (prisma) => {
        if (difference.length !== 0) {
          const newRows = difference.map((onestudentId) => {
            return {
              tutorId: tutorId,
              studentId: onestudentId, // access the studentId property of the onestudentId object
              availability: true, // replace with actual value
              checkStatus: matchtable_checkStatus.NOT_YET_CHECKED, // replace with actual value
              matchstatus: matchtable_matchstatus.OPEN,
            };
          });
          // await prisma.matchtable.createMany({
          //   data: newRows,
          // });
        }
        await prisma.matchtable.updateMany({
          where: {
            tutorId: tutorId,
            NOT: {
              studentId: {
                in: matchedstudentIds,
              },
            },
          },
          data: {
            matchstatus: 'NO_LONGER_MATCH',
          },
        });

        await prisma.matchtable.updateMany({
          where: {
            tutorId: tutorId,
            studentId: {
              in: matchedstudentIds,
            },
            OR: [
              { matchstatus: 'REJECTED' },
              { matchstatus: 'NO_LONGER_MATCH' },
            ],
          },
          data: {
            matchstatus: 'ASK_AGAIN',
          },
        });
      });

      return { message: 'Tutor profile updated successfully.' };
    } catch (err) {
      console.log('Error: ', err.message);
      return { error: 'An error occurred while processing the tutor profile.' };
    }
  }

  async matchStudent(req: any) {
    // Implement the matching system for students here
    // You can reuse your existing logic from the Express router
    enum matchtable_checkStatus {
      NOT_YET_CHECKED,
      CHECKING,
      CHECKED,
    }

    enum matchtable_matchstatus {
      REJECTED,
      ASK_AGAIN,
      NO_LONGER_MATCH,
      OPEN,
    }
    try {
      const { locations, subjects, highestfee, studentId } =
        req.body.information;

      const tutors = await findMatchingTutors(locations, subjects, highestfee);
      const matchedtutorIds = tutors.map((tutor) => tutor.tutorId);
      const tutorIdOfExistingMatch = await this.prisma.matchtable.findMany({
        where: {
          studentId: studentId,
          tutorId: {
            in: matchedtutorIds,
          },
        },
        select: {
          tutorId: true, // Include only the 'studentId' field in the result
        },
      });
      await this.prisma.$transaction(async (prisma) => {
        await prisma.matchtable.updateMany({
          where: {
            studentId: studentId,
            NOT: {
              tutorId: {
                in: matchedtutorIds,
              },
            },
          },
          data: {
            matchstatus: 'NO_LONGER_MATCH',
          },
        });

        await prisma.matchtable.updateMany({
          where: {
            studentId: studentId,
            tutorId: {
              in: matchedtutorIds,
            },
            OR: [
              { matchstatus: 'REJECTED' },
              { matchstatus: 'NO_LONGER_MATCH' },
            ],
          },
          data: {
            matchstatus: 'ASK_AGAIN',
          },
        });

        const difference = tutorIdOfExistingMatch.filter(
          (tutorId) => !matchedtutorIds.includes(tutorId),
        );
        if (difference.length !== 0) {
          const newRows = difference.map((onetutorId) => {
            return {
              studentId: studentId,
              tutorId: onetutorId, // access the studentId property of the onestudentId object
              availability: true, // replace with actual value
              checkStatus: matchtable_checkStatus.NOT_YET_CHECKED, // replace with actual value
              matchstatus: matchtable_matchstatus.OPEN,
            };
          });

          // await this.prisma.matchtable.createMany({
          //   data: newRows,
          // });
        }
      });
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
    s.studentId
    s.lastOnline
    FROM
      tutorperry.student s
    LEFT JOIN
      tutorperry.studentLocation sl ON s.studentId = sl.studentId
    LEFT JOIN
      tutorperry.location l ON sl.locationId = l.locationId
    LEFT JOIN
      tutorperry.studentSubject ss ON s.studentId = ss.studentId
    LEFT JOIN
      tutorperry.subject su ON ss.subjectId = su.subjectId
      WHERE
      ${lowestFee}
      s.studentId IN (
        SELECT DISTINCT s.studentId
        FROM tutorperry.student s
        LEFT JOIN tutorperry.studentLocation sl ON s.studentId = sl.studentId
        LEFT JOIN tutorperry.location l ON sl.locationId = l.locationId
        LEFT JOIN tutorperry.studentSubject ss ON s.studentId = ss.studentId
        LEFT JOIN tutorperry.subject su ON ss.subjectId = su.subjectId
        WHERE
        ${locationQuery} AND
        ${subjectQuery}
      )
    GROUP BY
      s.studentId
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
    t.tutorId
    t.lastOnline
    FROM 
    tutorperry.tutor t
LEFT JOIN 
    tutorperry.tutorLocation tl ON t.tutorId = tl.tutorId
LEFT JOIN 
    tutorperry.location l ON tl.locationId = l.locationId
LEFT JOIN
    tutorperry.tutorSubject ts ON t.tutorId = ts.tutorId
LEFT JOIN
    tutorperry.subject s ON ts.subjectId = s.subjectId
WHERE 
${highestFeeQuery}
t.tutorId IN (
  SELECT DISTINCT t.tutorId
  FROM tutorperry.tutor t
  LEFT JOIN tutorperry.tutorLocation tl ON t.tutorId = tl.tutorId
  LEFT JOIN tutorperry.location l ON tl.locationId = l.locationId
  LEFT JOIN tutorperry.tutorSubject ts ON t.tutorId = ts.tutorId
  LEFT JOIN tutorperry.subject s ON ts.subjectId = s.subjectId
  WHERE
  ${locationQuery} AND
  ${subjectQuery}
)
GROUP BY 
    t.tutorId
ORDER BY                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    t.lastOnline DESC;
`;

  return result;
}
