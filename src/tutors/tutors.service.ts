const newrelic = require('newrelic');
// tutors.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DataService } from '../helper/helperFunction.service';
import { UpdateTutorDto } from './dto/tutor.dto';
@Injectable()
export class TutorsService {
  constructor(private readonly DataService: DataService) {}
  private prisma = new PrismaClient();

  async findManyWithStatusOpen(): Promise<any> {
    try {
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

      return result;
      // result.then((data) => {
      //   const object = this.DataService.formatObject(data, 'tutor');
      //   console.log(object);
      //   return object;
      // });
    } catch (error) {
      throw new HttpException(
        'Error finding tutors with status open',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  public isFormComplete(tutorInfo: UpdateTutorDto): boolean {
    const requiredFields = [
      'language',
      'occupation',
      'secondaryschool',
      'primaryschool',
      'yearofexperience',
      'experience',
      'highestteachinglevel',
      'educationallevel',
      'notes',
      'schoolcat',
      'publicexamgrade',
      'strength',
      'highestfee',
      'lowestfee',
      'status',
      'lastOnline',
      'verify',
      'completeFormStatus',
      'locations',
      'subjects',
      'availtimes',
    ];

    return requiredFields.every((field) => {
      const value = tutorInfo[field];
      if (
        value == null ||
        value == '' ||
        JSON.stringify(value) == '[]' ||
        value == undefined
      ) {
        console.log(field);
      }
      return (
        value !== null &&
        value !== '' &&
        JSON.stringify(value) !== '[]' &&
        value !== undefined
      );
    });
  }

  async findManyWithStatusOpenWithFavourite(userId: number): Promise<any> {
    try {
      const result = await this.prisma.$queryRaw`SELECT 
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
    t.status = 'OPEN'
GROUP BY 
    t.tutorId,f.idfavourite
ORDER BY 
    t.lastOnline DESC;
`;

      return result;
    } catch (error) {
      throw new HttpException(
        'Error finding tutors with status open and favourite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
    try {
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
    } catch (error) {
      throw new HttpException(
        'Error getting favourite tutors',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findTutorsByPreference(
    highestfee: any,
    locations: [],
    subjects: [],
  ): Promise<any> {
    try {
      const highestFee = this.DataService.HighestFeeQuery(highestfee);
      let locationQuery = null;
      let subjectQuery = null;

      if (locations.length !== 0) {
        locationQuery = this.DataService.QueryBuilder(
          locations,
          'locations',
          'tutor',
        );
      }
      if (subjects.length !== 0) {
        subjectQuery = this.DataService.QueryBuilder(
          subjects,
          'subjects',
          'tutor',
        );
      }
      let mainQuery = `
  SELECT
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
      const result = await this.prisma.$queryRawUnsafe(mainQuery);

      return result;
    } catch (error) {
      throw new HttpException(
        'Error finding tutors by preference',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findTutorsByPreferenceWithFavourite(
    highestfee: any,
    locations: [],
    subjects: [],
    userId: number,
  ): Promise<any> {
    try {
      const highestFee = this.DataService.HighestFeeQuery(highestfee);
      let locationQuery = null;
      let subjectQuery = null;

      if (locations.length !== 0) {
        locationQuery = this.DataService.QueryBuilder(
          locations,
          'locations',
          'tutor',
        );
      }
      if (subjects.length !== 0) {
        subjectQuery = this.DataService.QueryBuilder(
          subjects,
          'subjects',
          'tutor',
        );
      }
      let mainQuery = `
  SELECT 
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
`;

      // Dynamic WHERE conditions for the main query
      let whereConditions = [];
      if (highestFee !== undefined) {
        whereConditions.push(highestFee);
      }

      // Subquery for tutorId filtering based on location and subject
      let subQuery = `
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
`;

      // Combine the WHERE conditions with the subquery
      if (whereConditions.length > 0) {
        mainQuery += ` WHERE ${whereConditions.join(' AND ')} AND ` + subQuery;
      } else {
        mainQuery += ` WHERE ` + subQuery;
      }

      // Add GROUP BY and ORDER BY clauses
      mainQuery += `
  GROUP BY 
    t.tutorId, f.idfavourite
  ORDER BY 
    t.lastOnline DESC
`;

      // Execute the raw query safely with Prisma
      const result = await this.prisma.$queryRawUnsafe(mainQuery);

      return result;
    } catch (error) {
      throw new HttpException(
        'Error finding tutors by preference',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createOrUpdateTutor(information: any): Promise<any> {
    try {
      const {
        userId,
        tutorId,
        availtimes,
        locations,
        subjects,
        subjectGrade,
        caseid,
        ...tutorinfo
      } = information;
      let date_ob = new Date();
      const formIsComplete = this.isFormComplete(information);
      const upsertTutor = await this.prisma.tutor.upsert({
        where: { userId: userId },
        update: {
          ...tutorinfo,
          lastOnline: date_ob,
          completeFormStatus: formIsComplete,
        },
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

          // console.log(allGrades);
          // const gradeMapping = allGrades.reduce((acc, grade) => {
          //   acc[grade.subjectkey] = grade.id;
          //   return acc;
          // }, {});

          const tutorId = upsertTutor.tutorId;
          const tutorGradeData = Object.entries(subjectGrade).map(
            ([key, grade]) => {
              const subject = allGrades.find((subj) => subj.subjectKey === key);
              return {
                tutorId,
                gradeId: subject ? subject.id : null,
                examGrade: grade,
              };
            },
          );
          // const tutorGradeData = Object.entries(subjectGrade).map(
          //   ([subjectKey, examGrade]) => {
          //     const gradeId = gradeMapping[subjectKey];
          //     // console.log(510, gradeMapping);
          //     return { tutorId, gradeId, examGrade };
          //   },
          // );
          // console.log(tutorGradeData);
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
          const tutorAvailTimesData = resolvedIds.availTimeIds.map(
            (availId) => ({
              tutorId: upsertTutor.tutorId,
              availTimeId: availId,
            }),
          );
          const tutorGradeData = resolvedIds.tutorGradeData;
          // Assuming 'subjectGrade' is the array you are referring to

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
            // prisma.tutorgrade.deleteMany({
            //   where: { tutorId: upsertTutor.tutorId },
            // }),
            //   // Prepare batch insert data

            // Batch insert new records
            prisma.tutorlocation.createMany({ data: tutorLocationsData }),
            prisma.tutorsubject.createMany({ data: tutorSubjectsData }),
            prisma.tutoravailtime.createMany({
              data: tutorAvailTimesData,
            }),
          ]);

          if (subjectGrade && Object.keys(subjectGrade).length > 0) {
            prisma.tutorgrade.createMany({
              data: tutorGradeData,
            });
          }
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
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error creating or updating tutor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // t.status = 'open' AND
}
