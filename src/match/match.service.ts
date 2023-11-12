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
      const { location, subject, lowestfee, tutorid } = req.body.information;

      const preference = {
        ...(lowestfee != null && { highestfee: { gte: lowestfee } }),
        status: 'open',
      };

      const students = await findMatchingStudents(
        location,
        subject,
        preference,
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
      const { location, subject, highestfee } = req.body.information;
      const studentid = req.body.studentid;

      const preference = {
        ...(highestfee != null ? { lowestfee: { lte: highestfee } } : {}),
        status: 'open',
      };

      const tutors = await findMatchingTutors(location, subject, preference);
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

async function findMatchingStudents(location, subject, preference) {
  const info = this.DataService.PrefereceToDBFormat(location, subject);
  const locationQuery = this.DataService.RemoveFalse(info.location[0]);
  const subjectQuery = this.DataService.RemoveFalse(info.subject[0]);
  const matchId = await this.prisma.student.findMany({
    where: {
      AND: [preference],
    },
    select: {
      studentid: true,
    },
  });
  const ids = matchId.map((item) => item.studentid);
  const filter1 = await this.prisma.location.findMany({
    where: {
      AND: [
        {
          studentid: {
            in: ids,
          },
        },
        {
          OR: locationQuery,
        },
      ],
    },
    select: {
      studentid: true,
    },
  });
  const filter1s = filter1.map((item) => item.studentid);
  const filter2 = await this.prisma.subject.findMany({
    where: {
      AND: [
        {
          studentid: {
            in: filter1s,
          },
        },
        {
          OR: subjectQuery,
        },
      ],
    },
    select: {
      studentid: true,
    },
  });

  const filter2s = filter2.map((item) => item.studentid);

  return filter2s;
}

// Helper function to find matching tutors
async function findMatchingTutors(location, subject, preference) {
  const info = this.DataService.PrefereceToDBFormat(location, subject);
  const locationQuery = this.DataService.RemoveFalse(info.location[0]);
  const subjectQuery = this.DataService.RemoveFalse(info.subject[0]);
  const tutorsid = await this.prisma.tutor.findMany({
    where: {
      AND: [preference],
    },
    select: {
      tutorid: true,
    },
  });
  const tutorIds = tutorsid.map((tutor) => tutor.tutorid);
  const filter1 = await this.prisma.location.findMany({
    where: {
      AND: [
        {
          tutorid: {
            in: tutorIds, // Assuming tutorsid is an array of tutor IDs
          },
        },
        {
          OR: locationQuery, // Your first locationQuery condition
          // Your second locationQuery condition
        },
      ],
    },
    select: {
      tutorid: true,
    },
  });
  const filter1s = filter1.map((tutor) => tutor.tutorid);
  const filter2 = await this.prisma.subject.findMany({
    where: {
      AND: [
        {
          tutorid: {
            in: filter1s, // Assuming tutorsid is an array of tutor IDs
          },
        },
        {
          OR: subjectQuery, // Your first locationQuery condition
          // Your second locationQuery condition
        },
      ],
    },
    select: {
      tutorid: true,
    },
  });

  const filter2s = filter2.map((tutor) => tutor.tutorid);

  return filter2s;
}
