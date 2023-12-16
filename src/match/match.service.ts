import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DataService } from '../helper/helperFunction.service';
import { Prisma, matchtable_checkStatus } from '@prisma/client';
import { isEqual } from 'lodash';
@Injectable()
export class MatchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly DataService: DataService,
  ) {}

  async matchTutor(req: any) {
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

      const difference =
        studentIdOfExistingMatch.length == 0
          ? matchedstudentIds
          : studentIdOfExistingMatch.filter(
              (studentId) => !matchedstudentIds.includes(studentId.studentId),
            );

      await this.prisma.$transaction(async (prisma) => {
        if (difference.length !== 0) {
          const newRows = difference.map((onestudentId) => {
            return {
              tutorId: tutorId,
              studentId: onestudentId, // access the studentId property of the onestudentId object
              availability: true, // replace with actual value
              checkStatus: 'NOT_YET_CHECKED', // replace with actual value
              matchstatus: 'OPEN',
            };
          });
          await prisma.matchtable.createMany({
            data: newRows,
          });
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
    } catch (error) {
      console.error('Error in matchTutor: ', error.message);
      throw new HttpException(
        'Failed to match tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      const { locations, subjects, highestfee, studentId } = req;

      const tutors = await findMatchingTutors(
        locations,
        subjects,
        highestfee,
        this.DataService,
        this.prisma,
      );
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
        await this.prisma.matchtable.updateMany({
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

        await this.prisma.matchtable.updateMany({
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

        const difference =
          tutorIdOfExistingMatch.length == 0
            ? matchedtutorIds
            : tutorIdOfExistingMatch.filter((tutorId) => {
                return !matchedtutorIds.includes(tutorId.tutorId);
              });
        if (difference.length !== 0) {
          const newRows = difference.map((onetutorId) => {
            return {
              studentId: studentId,
              tutorId: onetutorId, // access the studentId property of the onestudentId object
              availability: true, // replace with actual value
              checkStatus: 'NOT_YET_CHECKED',
              matchstatus: 'OPEN',
            };
          });
          if (difference.length !== 0) {
            await this.prisma.matchtable.createMany({
              data: newRows,
            });
          }
        }
      });
      return { message: 'Student request processed successfully.' };
    } catch (error) {
      console.error('Error in matchStudent: ', error.message);
      throw new HttpException(
        'Failed to match student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

async function findMatchingStudents(locations, subjects, lowestfee) {
  try {
    const lowestFee = await this.DataService.LowestFeeQuery(lowestfee);
    let locationQuery = null;
    let subjectQuery = null;

    if (locations.length !== 0) {
      locationQuery = await this.DataService.QueryBuilder(
        locations,
        'locations',
        'student',
      );
    }

    if (subjects.length !== 0) {
      subjectQuery = await this.DataService.QueryBuilder(
        subjects,
        'subjects',
        'student',
      );
    }
    // Start with the static part of the query
    let query = `
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
`;

    // Add dynamic WHERE conditions for the main query
    let whereConditions = [];
    if (lowestFee !== undefined) {
      whereConditions.push(lowestFee);
    }

    // Add the WHERE clause if there are conditions to include
    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    // Add the subquery with its own dynamic WHERE conditions
    let subquery = `
   s.studentId IN (
    SELECT DISTINCT s.studentId
    FROM tutorperry.student s
    LEFT JOIN tutorperry.studentLocation sl ON s.studentId = sl.studentId
    LEFT JOIN tutorperry.location l ON sl.locationId = l.locationId
    LEFT JOIN tutorperry.studentSubject ss ON s.studentId = ss.studentId
    LEFT JOIN tutorperry.subject su ON ss.subjectId = su.subjectId
`;

    // Add dynamic WHERE conditions for the subquery
    let subWhereConditions = [];
    if (locationQuery) {
      subWhereConditions.push(locationQuery);
    }
    if (subjectQuery) {
      subWhereConditions.push(subjectQuery);
    }

    // Add the WHERE clause if there are subquery conditions to include
    if (subWhereConditions.length > 0) {
      subquery += ` WHERE ${subWhereConditions.join(' AND ')}`;
    }

    // Close the subquery
    subquery += `)`;

    // Add the subquery to the main query
    query += subquery;

    // Add GROUP BY and ORDER BY clauses
    query += `
  GROUP BY
    s.studentId
  ORDER BY
    s.lastOnline DESC
`;

    // Execute the raw query safely with Prisma
    const result = await this.prisma.$queryRawUnsafe(query);

    return result;
  } catch (error) {
    console.error('Error in findMatchingStudents: ', error.message);
    throw new HttpException(
      'Failed to find matching students',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

// Helper function to find matching tutors
async function findMatchingTutors(
  locations,
  subjects,
  highestfee,
  DataService,
  prisma,
) {
  try {
    const highestFee = DataService.HighestFeeQuery(highestfee);
    let locationQuery = null;
    let subjectQuery = null;

    if (locations.length !== 0) {
      locationQuery = DataService.QueryBuilder(locations, 'locations', 'tutor');
    }
    if (subjects.length !== 0) {
      subjectQuery = DataService.QueryBuilder(subjects, 'subjects', 'tutor');
    }
    let mainQuery = `
SELECT
t.tutorId,
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
`;

    // Dynamic WHERE conditions for the main query
    let whereConditions = [];
    if (highestFee !== undefined) {
      whereConditions.push(highestFee);
    }

    // Add the WHERE clause if there are conditions to include
    if (whereConditions.length > 0) {
      mainQuery += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    // Subquery with its own dynamic WHERE conditions
    let subQuery = `
t.tutorId IN (
SELECT DISTINCT t.tutorId
FROM tutorperry.tutor t
LEFT JOIN tutorperry.tutorLocation tl ON t.tutorId = tl.tutorId
LEFT JOIN tutorperry.location l ON tl.locationId = l.locationId
LEFT JOIN tutorperry.tutorSubject ts ON t.tutorId = ts.tutorId
LEFT JOIN tutorperry.subject s ON ts.subjectId = s.subjectId
`;

    // Dynamic WHERE conditions for the subquery
    let subWhereConditions = [];
    if (locationQuery) {
      subWhereConditions.push(locationQuery);
    }
    if (subjectQuery) {
      subWhereConditions.push(subjectQuery);
    }

    // Add the WHERE clause if there are subquery conditions to include
    if (subWhereConditions.length > 0) {
      subQuery += ` WHERE ${subWhereConditions.join(' AND ')}`;
    }

    // Close the subquery
    subQuery += `)`;

    // Add the subquery to the main query
    mainQuery += subQuery;

    // Add GROUP BY and ORDER BY clauses
    mainQuery += `
GROUP BY
t.tutorId
ORDER BY
t.lastOnline DESC
`;

    // Execute the raw query safely with Prisma
    const result = await prisma.$queryRawUnsafe(mainQuery);

    return result;
  } catch (error) {
    console.error('Error in findMatchingTutors: ', error.message);
    throw new HttpException(
      'Failed to find matching tutors',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
