// tutors.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DataService } from '../helper/helperFunction.service';

@Injectable()
export class TutorsService {
  constructor(private readonly DataService: DataService) {}
  private prisma = new PrismaClient();

  async findManyWithStatusOpen(): Promise<any> {
    const result = await this.prisma.$queryRaw` 
    SELECT 
    t.*,
    GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
    GROUP_CONCAT(DISTINCT s.name SEPARATOR ',') AS subjects,
    GROUP_CONCAT(DISTINCT CONCAT(at.day, '-', at.time) SEPARATOR ',') AS availtimes,
    (
      SELECT JSON_OBJECTAGG(g.subjectkey, tg.examGrade) 
      FROM tutorperry.tutorgrade tg
      JOIN tutorperry.grade g ON tg.gradeId = g.id
      WHERE tg.tutorId = t.tutorId
  ) AS subjectGrade
FROM 
    tutorperry.tutor t
LEFT JOIN 
    tutorperry.tutorLocation tl ON t.tutorId = tl.tutorId
LEFT JOIN 
    tutorperry.location l ON tl.locationId = l.locationId
LEFT JOIN 
    tutorperry.TutorSubject ts ON t.tutorId = ts.tutorId
LEFT JOIN 
    tutorperry.Subject s ON ts.subjectId = s.subjectId
LEFT JOIN 
    tutorperry.TutorAvailTime tat ON t.tutorId = tat.tutorId
LEFT JOIN 
    tutorperry.AvailTime at ON tat.availTimeId = at.id
WHERE 
    t.status = 'OPEN'
GROUP BY 
    t.tutorId
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

  async findManyWithStatusOpenWithFavourite(userId: number): Promise<any> {
    const result = await this.prisma.$queryRaw` 
    SELECT 
    t.*,
    GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
    GROUP_CONCAT(DISTINCT s.name SEPARATOR ',') AS subjects,
    GROUP_CONCAT(DISTINCT CONCAT(at.day, '-', at.time) SEPARATOR ',') AS availtimes,
    f.idfavourite AS idfavourite,
    (
      SELECT JSON_OBJECTAGG(g.subjectkey, tg.examGrade) 
      FROM tutorperry.tutorgrade tg
      JOIN tutorperry.grade g ON tg.gradeId = g.id
      WHERE tg.tutorId = t.tutorId
  ) AS subjectGrade
FROM 
    tutorperry.tutor t
LEFT JOIN 
    tutorperry.tutorLocation tl ON t.tutorId = tl.tutorId
LEFT JOIN 
    tutorperry.location l ON tl.locationId = l.locationId
LEFT JOIN 
    tutorperry.TutorSubject ts ON t.tutorId = ts.tutorId
LEFT JOIN 
    tutorperry.Subject s ON ts.subjectId = s.subjectId
LEFT JOIN 
    tutorperry.TutorAvailTime tat ON t.tutorId = tat.tutorId
LEFT JOIN 
    tutorperry.AvailTime at ON tat.availTimeId = at.id
LEFT JOIN
    tutorperry.favourite f ON t.tutorId = f.tutorId AND f.userId = ${userId}
WHERE 
    t.status = 'open'
GROUP BY 
    t.tutorId,f.idfavourite
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
    //     userId: userId,
    //   },
    // });
    // const tutorIdList = user ? (user.favouritetutorId as number[]) : [];
    // const result = this.prisma.tutor.findMany({
    //   orderBy: {
    //     lastOnline: 'desc',
    //   },
    //   where: {
    //     tutorId: { in: tutorIdList },
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

  async getTutorByuserId(userId: number, dummyTutor: any): Promise<any> {
    const result = await this.prisma.$queryRaw` 
    SELECT 
    t.*,
    GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
    GROUP_CONCAT(DISTINCT s.name SEPARATOR ',') AS subjects,
    GROUP_CONCAT(DISTINCT CONCAT(at.day, '-', at.time) SEPARATOR ',') AS availtimes,
    (
      SELECT JSON_OBJECTAGG(g.subjectkey, tg.examGrade) 
      FROM tutorperry.tutorgrade tg
      JOIN tutorperry.grade g ON tg.gradeId = g.id
      WHERE tg.tutorId = t.tutorId
  ) AS subjectGrade
FROM 
    tutorperry.tutor t
LEFT JOIN 
    tutorperry.tutorLocation tl ON t.tutorId = tl.tutorId
LEFT JOIN 
    tutorperry.location l ON tl.locationId = l.locationId
LEFT JOIN 
    tutorperry.TutorSubject ts ON t.tutorId = ts.tutorId
LEFT JOIN 
    tutorperry.Subject s ON ts.subjectId = s.subjectId
LEFT JOIN 
    tutorperry.TutorAvailTime tat ON t.tutorId = tat.tutorId
LEFT JOIN 
    tutorperry.AvailTime at ON tat.availTimeId = at.id
WHERE 
    t.userId = ${userId}
GROUP BY 
    t.tutorId

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
      return { userId: userId, ...dummyTutor };
    }
  }

  async findTutorsByPreference(
    highestfee: any,
    locations: [],
    subjects: [],
  ): Promise<any> {
    console.log(locations);
    const highestFee = this.DataService.HighestFeeQuery(highestfee);
    const locationQuery = this.DataService.QueryBuilder(
      locations,
      'locations',
      'tutor',
    );
    const subjectQuery = this.DataService.QueryBuilder(
      subjects,
      'subjects',
      'tutor',
    );

    const result = await this.prisma.$queryRaw`  SELECT 
        t.*,
        GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
        GROUP_CONCAT(DISTINCT s.name SEPARATOR ',') AS subjects,
        (
          SELECT JSON_OBJECTAGG(g.subjectkey, tg.examGrade) 
          FROM tutorperry.tutorgrade tg
          JOIN tutorperry.grade g ON tg.gradeId = g.id
          WHERE tg.tutorId = t.tutorId
      ) AS subjectGrade
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
        ${highestFee}
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

  async findTutorsByPreferenceWithFavourite(
    highestfee: any,
    locations: [],
    subjects: [],
    userId: number,
  ): Promise<any> {
    console.log(locations);
    const highestFee = this.DataService.HighestFeeQuery(highestfee);
    const locationQuery = this.DataService.QueryBuilder(
      locations,
      'locations',
      'tutor',
    );
    const subjectQuery = this.DataService.QueryBuilder(
      subjects,
      'subjects',
      'tutor',
    );

    const result = await this.prisma.$queryRaw`  SELECT 
        t.*,
        GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
        GROUP_CONCAT(DISTINCT s.name SEPARATOR ',') AS subjects,
        f.idfavourite AS idfavourite,
        (
          SELECT JSON_OBJECTAGG(g.subjectkey, tg.examGrade) 
          FROM tutorperry.tutorgrade tg
          JOIN tutorperry.grade g ON tg.gradeId = g.id
          WHERE tg.tutorId = t.tutorId
      ) AS subjectGrade
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
        LEFT JOIN
            tutorperry.favourite f ON t.tutorId = f.tutorId AND f.userId = ${userId}
        WHERE 
        ${highestFee}
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
            t.tutorId,f.idfavourite
        ORDER BY 
            t.lastOnline DESC;
    `;
    return result;
  }

  async createOrUpdateTutor(information: any): Promise<any> {
    const {
      userId,
      tutorId,
      availtimes,
      locations,
      subjects,
      subjectGrade,
      ...tutorinfo
    } = information;
    let date_ob = new Date();
    const upsertTutor = await this.prisma.tutor.upsert({
      where: { userId: userId },
      update: { ...tutorinfo, lastOnline: date_ob, completeFormStatus: false },
      create: {
        // userId: userId,
        ...tutorinfo,
        lastOnline: date_ob,
        completeFormStatus: false,
      },
    });
    async function upsertTutorDetailsRaw(
      prisma,
      tutorId,
      availtime,
      location,
      subject,
      subjectGrade,
    ) {
      async function resolveIds(
        prisma,
        locations,
        subjects,
        availtimes,
        subjectGrade,
      ) {
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
        const allGrades = await prisma.grade.findMany({
          select: { id: true, subjectKey: true },
        });

        const gradeMapping = allGrades.reduce((acc, grade) => {
          acc[grade.subjectkey] = grade.id;
          return acc;
        }, {});
        const tutorId = upsertTutor.tutorId;
        const tutorGradeData = Object.entries(subjectGrade).map(
          ([subjectKey, examGrade]) => {
            const gradeId = gradeMapping[subjectKey];

            return { tutorId, gradeId, examGrade };
          },
        );
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
            return allAvailTimes.find(
              (avt) => avt.day === day && avt.time === time,
            )?.id;
          })
          .filter(Boolean);
        return { locationIds, subjectIds, availTimeIds, tutorGradeData };
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
      const filteredSubjectGrade = subjectGrade ? subjectGrade : {};
      resolveIds(
        prisma,
        filteredLocation,
        filteredSubject,
        filteredAvailtime,
        filteredSubjectGrade,
      ).then(async (resolvedIds) => {
        const tutorLocationsData = resolvedIds.locationIds.map((locId) => ({
          tutorId: upsertTutor.tutorId,
          locationId: locId,
        }));
        const tutorSubjectsData = resolvedIds.subjectIds.map((subId) => ({
          tutorId: upsertTutor.tutorId,
          subjectId: subId,
        }));
        const tutorAvailTimesData = resolvedIds.availTimeIds.map((availId) => ({
          tutorId: upsertTutor.tutorId,
          availTimeId: availId,
        }));
        const tutorGradeData = resolvedIds.tutorGradeData;
        // Assuming 'subjectGrade' is the array you are referring to
        if (subjectGrade && subjectGrade.length > 0) {
          prisma.tutorgrade.createMany({
            data: tutorGradeData,
          });
        }

        prisma.$transaction([
          // Delete existing relations
          prisma.tutorlocation.deleteMany({
            where: { tutorId: upsertTutor.tutorId },
          }),
          prisma.tutorsubject.deleteMany({
            where: { tutorId: upsertTutor.tutorId },
          }),
          prisma.tutoravailtime.deleteMany({
            where: { tutorId: upsertTutor.tutorId },
          }),
          prisma.tutorgrade.deleteMany({
            where: { tutorId: upsertTutor.tutorId },
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
      this.prisma,
      tutorId,
      availtimes,
      locations,
      subjects,
      subjectGrade,
    );
  }
  // t.status = 'open' AND
}
