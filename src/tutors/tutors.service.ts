// tutors.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DataService } from '../helper/helperFunction.service';

@Injectable()
export class TutorsService {
  constructor(private readonly DataService: DataService) {}
  private prisma = new PrismaClient();

  async findAllTutors(): Promise<any> {
    const result = await this.prisma.$queryRaw` 
    SELECT 
    t.*,
    GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
    GROUP_CONCAT(DISTINCT s.name SEPARATOR ',') AS subjects,
    GROUP_CONCAT(DISTINCT CONCAT(at.day, '', at.time) SEPARATOR ',') AS availtimes
FROM 
    tutorperry.tutor t
LEFT JOIN 
    tutorperry.tutorLocation tl ON t.tutorid = tl.tutorId
LEFT JOIN 
    tutorperry.location l ON tl.locationId = l.locationId
LEFT JOIN 
    tutorperry.TutorSubject ts ON t.tutorid = ts.tutorId
LEFT JOIN 
    tutorperry.Subject s ON ts.subjectId = s.subjectId
LEFT JOIN 
    tutorperry.TutorAvailTime tat ON t.tutorid = tat.tutorId
LEFT JOIN 
    tutorperry.AvailTime at ON tat.availTimeId = at.id
WHERE 
    t.status = 'open'
GROUP BY 
    t.tutorid
ORDER BY 
    t.lastOnline DESC;

`;

    console.log(result);
    return result;
    // result.then((data) => {
    //   const object = this.DataService.formatObject(data, 'tutor');
    //   console.log(object);
    //   return object;
    // });
  }

  async getFavouriteTutors(userId: number): Promise<any> {
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     userid: userId,
    //   },
    // });
    // const tutorIdList = user ? (user.favouritetutorid as number[]) : [];
    // const result = this.prisma.tutor.findMany({
    //   orderBy: {
    //     lastOnline: 'desc',
    //   },
    //   where: {
    //     tutorid: { in: tutorIdList },
    //   },
    //   include: {
    //     location: true,
    //     availtime: true,
    //     subject: true,
    //   },
    // });
    // result.then((data) => {
    //   const object = this.DataService.formatObject(data, 'tutor');
    //   console.log(object);
    //   return object;
    // });
  }

  async getTutorByUserId(userId: number, dummyTutor: any): Promise<any> {
    const result = await this.prisma.tutor.findUnique({
      where: {
        tutorid: userId,
      },
    });
    if (result !== null) {
      const object = this.DataService.formatObject([result], 'tutor');
      console.log(object);
      return object;
    } else {
      return { userid: userId, ...dummyTutor };
    }
  }

  async createOrUpdateTutor(information: any): Promise<any> {
    console.log(information);
    const formatData = this.DataService.ToDBFormat(information, 'tutor');
    const { userid, tutorid, availtime, location, subject, ...tutorinfo } =
      formatData;
    let date_ob = new Date();
    // async function upsertTutorDetailsRaw(tutorData) {
    //   const { id, location, availtime, subject } = tutorData;

    //   // Convert location names, subjects, and available times to their respective IDs
    //   const locationIds = await resolveLocationIds(location); // Implement this
    //   const subjectIds = await resolveSubjectIds(subject); // Implement this
    //   const availTimeIds = await resolveAvailTimeIds(availtime); // Implement this

    //   // Start transaction
    //   await this.prisma.$transaction(async (prisma) => {
    //     // Delete existing relations
    //     await prisma.$executeRaw`DELETE FROM tutorLocation WHERE tutorId = ${id}`;
    //     await prisma.$executeRaw`DELETE FROM tutorSubject WHERE tutorId = ${id}`;
    //     await prisma.$executeRaw`DELETE FROM tutorAvailTime WHERE tutorId = ${id}`;

    //     // Insert new records for each table
    //     for (const locId of locationIds) {
    //       await prisma.$executeRaw`INSERT INTO tutorLocation (tutorId, locationId) VALUES (${id}, ${locId})`;
    //     }

    //     for (const subId of subjectIds) {
    //       await prisma.$executeRaw`INSERT INTO tutorSubject (tutorId, subjectId) VALUES (${id}, ${subId})`;
    //     }

    //     for (const availId of availTimeIds) {
    //       await prisma.$executeRaw`INSERT INTO tutorAvailTime (tutorId, availTimeId) VALUES (${id}, ${availId})`;
    //     }
    //   });
    // }
  }

  async findTutorsByPreference(
    preference: any,
    location: [],
    subject: [],
  ): Promise<any> {
    const lowestFee = this.DataService.LowestFeeQuery(preference.lowestfee);
    const locationQuery = this.DataService.QueryBuilder(location, 'location');
    const subjectQuery = this.DataService.QueryBuilder(subject, 'subject');
    const result = await this.prisma.$queryRaw`
    SELECT 
        t.*,
        GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
        GROUP_CONCAT(DISTINCT s.name SEPARATOR ',') AS subjects
    FROM 
        tutor t
    LEFT JOIN 
        tutorLocation tl ON t.tutorid = tl.tutorId
    LEFT JOIN 
        location l ON tl.locationId = l.locationId
    LEFT JOIN
        tutorSubject ts ON t.tutorid = ts.tutorId
    LEFT JOIN
        subject s ON ts.subjectId = s.subjectId
    WHERE 
        t.status = 'open' AND
        ${lowestFee}
        ${locationQuery} AND
        ${subjectQuery}
    GROUP BY 
        t.tutorid
    ORDER BY 
        t.lastOnline DESC;
`;
    return result;
  }
}
