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
    GROUP_CONCAT(DISTINCT CONCAT(at.day, '-', at.time) SEPARATOR ',') AS availtimes
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
    const result = await this.prisma.$queryRaw` 
    SELECT 
    t.*,
    GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
    GROUP_CONCAT(DISTINCT s.name SEPARATOR ',') AS subjects,
    GROUP_CONCAT(DISTINCT CONCAT(at.day, '-', at.time) SEPARATOR ',') AS availtimes
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
    t.status = 'open' AND t.userid = ${userId}
GROUP BY 
    t.tutorid
ORDER BY 
    t.lastOnline DESC;

`;
    if (result !== null) {
      result[0].locations = result[0].locations
        ? result[0].locations.split(',')
        : [];
      result[0].subjects = result[0].subjects
        ? result[0].subjects.split(',')
        : [];
      result[0].availtimes = result[0].availtimes
        ? result[0].availtimes.split(',')
        : [];
      console.log(result[0]);
      return result[0];
    } else {
      return { userid: userId, ...dummyTutor };
    }
  }

  async createOrUpdateTutor(information: any): Promise<any> {
    const { userid, tutorid, availtimes, locations, subjects, ...tutorinfo } =
      information;
    let date_ob = new Date();
    await this.prisma.tutor.upsert({
      where: { userid: userid },
      update: { ...tutorinfo, lastOnline: date_ob, completeFormStatus: false },
      create: {
        // userid: userid,
        ...tutorinfo,
        lastOnline: date_ob,
        completeFormStatus: false,
      },
    });

    async function upsertTutorDetailsRaw(
      tutorid,
      availtime,
      location,
      subject,
      prisma,
    ) {
      async function resolveIds(locations, subjects, availtimes, prisma) {
        // Query each table once
        const allLocations = await prisma.location.findMany({
          select: { locationId: true, location: true },
        });
        const allSubjects = await prisma.subject.findMany({
          select: { subjectId: true, name: true },
        });
        const allAvailTimes = await prisma.availtime.findMany({
          select: { id: true, day: true, time: true },
        });

        // Map names to IDs
        const locationIds = locations
          .map(
            (loc) => allLocations.find((l) => l.location === loc)?.locationId,
          )
          .filter(Boolean);
        const subjectIds = subjects
          .map((sub) => allSubjects.find((s) => s.name === sub)?.subjectId)
          .filter(Boolean);
        const availTimeIds = availtimes
          .map((at) => {
            const [day, time] = at.split('-');
            console.log(at);
            return allAvailTimes.find(
              (avt) => avt.day === day && avt.time === time,
            )?.id;
          })
          .filter(Boolean);

        return { locationIds, subjectIds, availTimeIds };
      }

      // Example usage
      const filteredLocation = location
        ? location.filter((item) => item !== null)
        : [];
      const filteredSubject = subject
        ? subject.filter((item) => item !== null)
        : [];
      const filteredAvailtime = availtime
        ? availtime.filter((item) => item !== null)
        : [];
      resolveIds(
        filteredLocation,
        filteredSubject,
        filteredAvailtime,
        prisma,
      ).then(async (resolvedIds) => {
        console.log(resolvedIds);
        const tutorLocationsData = resolvedIds.locationIds.map((locId) => ({
          tutorId: tutorid ? tutorid : userid,
          locationId: locId,
        }));
        const tutorSubjectsData = resolvedIds.subjectIds.map((subId) => ({
          tutorId: tutorid ? tutorid : userid,
          subjectId: subId,
        }));
        const tutorAvailTimesData = resolvedIds.availTimeIds.map((availId) => ({
          tutorId: tutorid ? tutorid : userid,
          availTimeId: availId,
        }));
        console.log(resolvedIds);

        prisma.$transaction([
          // Delete existing relations
          prisma.tutorlocation.deleteMany({
            where: { tutorId: tutorid ? tutorid : userid },
          }),
          prisma.tutorsubject.deleteMany({
            where: { tutorId: tutorid ? tutorid : userid },
          }),
          prisma.tutoravailtime.deleteMany({
            where: { tutorId: tutorid ? tutorid : userid },
          }),

          //   // Prepare batch insert data

          // Batch insert new records
          prisma.tutorlocation.createMany({ data: tutorLocationsData }),
          prisma.tutorsubject.createMany({ data: tutorSubjectsData }),
          prisma.tutoravailtime.createMany({
            data: tutorAvailTimesData,
          }),
        ]);
      });
    }

    upsertTutorDetailsRaw(
      tutorid,
      availtimes,
      locations,
      subjects,
      this.prisma,
    );
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
    t.status = 'open' AND
    ${lowestFee}
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
    GROUP BY 
        t.tutorid
    ORDER BY 
        t.lastOnline DESC;
`;
    return result;
  }
}
