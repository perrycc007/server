import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a PrismaService
import { DataService } from '../helper/helperFunction.service';
import { UpdateStudentDto } from './dto/student.dto';
@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly DataService: DataService,
  ) {}
  public isFormComplete(studentInfo: UpdateStudentDto): boolean {
    const requiredFieldsWithValidation = [
      'expectation',
      'lowestfee',
      'highestfee',
      'lowestduration',
      'highestduration',
      'lowestfrequency',
      'highestfrequency',
      'locations',
      'availtimes',
      'subjects',
    ];

    return requiredFieldsWithValidation.every((field) => {
      const value = studentInfo[field];
      return (
        value !== null &&
        value !== '' &&
        JSON.stringify(value) !== '[]' &&
        value !== undefined
      );
    });
  }
  async findManyWithStatusOpen(): Promise<any> {
    try {
      const result = await this.prisma.$queryRaw` 
    SELECT 
      s.*,
      GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
      GROUP_CONCAT(DISTINCT subj.name SEPARATOR ',') AS subjects,
      GROUP_CONCAT(DISTINCT CONCAT(at.day, '-', at.time) SEPARATOR ',') AS availtimes
    FROM 
      tutorperry.student s
    LEFT JOIN 
      tutorperry.studentLocation sl ON s.studentId = sl.studentId
    LEFT JOIN 
      tutorperry.location l ON sl.locationId = l.locationId
    LEFT JOIN 
      tutorperry.StudentSubject ss ON s.studentId = ss.studentId
    LEFT JOIN 
      tutorperry.Subject subj ON ss.subjectId = subj.subjectId
    LEFT JOIN 
      tutorperry.StudentAvailTime sat ON s.studentId = sat.studentId
    LEFT JOIN 
      tutorperry.AvailTime at ON sat.availTimeId = at.id
    WHERE 
      s.status = 'OPEN'
    GROUP BY 
      s.studentId
    ORDER BY 
      s.lastOnline DESC;
  `;
      console.log(result, 64);
      return result;
    } catch (error) {
      throw new HttpException(
        'Error finding students with status open',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findManyWithStatusOpenWithFavourite(userId: number): Promise<any> {
    try {
      const result = await this.prisma.$queryRaw` 
    SELECT 
      s.*,
      GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
      GROUP_CONCAT(DISTINCT subj.name SEPARATOR ',') AS subjects,
      f.idfavourite AS idfavourite
    FROM 
      tutorperry.student s
    LEFT JOIN 
      tutorperry.studentLocation sl ON s.studentId = sl.studentId
    LEFT JOIN 
      tutorperry.location l ON sl.locationId = l.locationId
    LEFT JOIN 
      tutorperry.StudentSubject ss ON s.studentId = ss.studentId
    LEFT JOIN 
      tutorperry.Subject subj ON ss.subjectId = subj.subjectId
    LEFT JOIN 
      tutorperry.StudentAvailTime sat ON s.studentId = sat.studentId
    LEFT JOIN 
      tutorperry.AvailTime at ON sat.availTimeId = at.id
    LEFT JOIN
      tutorperry.favourite f ON s.studentId = f.studentId AND f.userId = ${userId}
    GROUP BY 
      s.studentId, f.idfavourite
    ORDER BY 
      s.lastOnline DESC;
  `;
      return result;
    } catch (error) {
      throw new HttpException(
        'Error finding students with status open and favourite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStudentbyStudentId(studentId: string) {
    try {
      const result = await this.prisma.$queryRaw`
    SELECT 
    t.*,
    GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
    GROUP_CONCAT(DISTINCT s.name SEPARATOR ',') AS subjects
    FROM 
      tutorperry.student s
    LEFT JOIN 
      tutorperry.studentlocation sl ON s.studentId = sl.studentId
    LEFT JOIN 
      tutorperry.location l ON sl.locationId = l.locationId
    LEFT JOIN
      tutorperry.studentsubject ss ON s.studentId = ss.studentId
    LEFT JOIN
      tutorperry.subject su ON ss.subjectId = su.subjectId
    WHERE 
      s.status = 'OPEN' AND
      s.studentId = ${studentId}
    GROUP BY 
      s.studentId
    ORDER BY 
      s.lastOnline DESC;
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
      }
    } catch (error) {
      throw new HttpException(
        'Error finding user favourite cases',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findStudentByPreference(
    lowestfee: any,
    locations: [],
    subjects: [],
  ): Promise<any> {
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
      s.*,
      GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
      GROUP_CONCAT(DISTINCT su.name SEPARATOR ',') AS subjects
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
      // console.log(query);
      const result = await this.prisma.$queryRawUnsafe(query);

      return result;
    } catch (error) {
      throw new HttpException(
        'Error finding student by preference',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findStudentByPreferenceWithFavourite(
    userId: number,
    lowestfee: any,
    locations: [],
    subjects: [],
  ): Promise<any> {
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
      let query = `
    SELECT
      s.*,
      GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
      GROUP_CONCAT(DISTINCT su.name SEPARATOR ',') AS subjects
      f.idfavourite AS idfavourite
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
    LEFT JOIN
      tutorperry.favourite f ON s.studentId = f.studentId AND f.userId = ${userId}
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
      s.studentId,  f.idfavourite
    ORDER BY
      s.lastOnline DESC
  `;

      // Execute the raw query safely with Prisma
      const result = await this.prisma.$queryRawUnsafe(query);
      return result;
    } catch (error) {
      throw new HttpException(
        'Error finding student by preference with favourite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUniqueUserFavouriteCases(userId: number): Promise<any> {
    // const favourite = await this.prismaService.user.findUnique({
    //   where: { userId: userId },
    // });
    // const caseIdList = favourite ? (favourite.favouritecaseid as number[]) : [];
    // const result = await this.prismaService.student.findMany({
    //   where: { studentId: { in: caseIdList } },
    //   orderBy: { lastOnline: 'desc' },
    //   include: {
    //     location: true,
    //     availtime: true,
    //     subject: true,
    //   },
    // });
    // const object = this.DataService.formatObject(result, 'student');
    // console.log(object);
    // return object;
  }
  async updateCaseStatus(requestBody: any): Promise<any> {
    try {
      let date_ob = new Date();
      await this.prisma.student.update({
        where: { studentId: requestBody.studentId },
        data: {
          ...requestBody,
          lastOnline: date_ob,
          completeFormStatus: false,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error changing status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateStudent(information: any): Promise<any> {
    try {
      const {
        userId,
        studentId,
        availtimes,
        locations,
        subjects,
        availtime,
        ...studentinfo
      } = information;
      let date_ob = new Date();
      const formIsComplete = this.isFormComplete(information);
      await this.prisma.student.update({
        where: { studentId: studentId },
        data: {
          ...studentinfo,
          lastOnline: date_ob,
          completeFormStatus: formIsComplete,
        },
      });

      async function upsertStudentDetailsRaw(
        studentId,
        availtime,
        location,
        subject,
        prisma,
        DataService,
      ) {
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
        DataService.ResolveIds(
          filteredLocation,
          filteredSubject,
          filteredAvailtime,
          prisma,
        ).then(async (resolvedIds) => {
          const studentLocationsData = resolvedIds.locationIds.map((locId) => ({
            studentId: studentId,
            locationId: locId,
          }));
          const studentSubjectsData = resolvedIds.subjectIds.map((subId) => ({
            studentId: studentId,
            subjectId: subId,
          }));
          const studentAvailTimesData = resolvedIds.availTimeIds.map(
            (availId) => ({
              studentId: studentId,
              availTimeId: availId,
            }),
          );

          prisma.$transaction([
            // Delete existing relations
            prisma.studentlocation.deleteMany({
              where: { studentId: studentId },
            }),
            prisma.studentsubject.deleteMany({
              where: { studentId: studentId },
            }),
            prisma.studentavailtime.deleteMany({
              where: { studentId: studentId },
            }),

            //   // Prepare batch insert data

            // Batch insert new records
            prisma.studentlocation.createMany({ data: studentLocationsData }),
            prisma.studentsubject.createMany({ data: studentSubjectsData }),
            prisma.studentavailtime.createMany({
              data: studentAvailTimesData,
            }),
          ]);
        });
      }

      upsertStudentDetailsRaw(
        studentId,
        availtimes,
        locations,
        subjects,
        this.prisma,
        this.DataService,
      );
    } catch (error) {
      throw new HttpException(
        'Error updating student information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createStudent(information: any): Promise<any> {
    try {
      const { userId, availtimes, locations, subjects, ...studentinfo } =
        information;
      let date_ob = new Date();
      let studentId = null;
      const formIsComplete = this.isFormComplete(information);
      await this.prisma.student
        .create({
          data: {
            userId: userId,
            ...studentinfo,
            lastOnline: date_ob,
            completeFormStatus: formIsComplete,
          },
        })
        .then((result) => {
          studentId = result.studentId;
        });

      async function upsertStudentDetailsRaw(
        availtime,
        location,
        subject,
        prisma,
        DataService,
      ) {
        console.log(availtime);
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
        DataService.ResolveIds(
          filteredLocation,
          filteredSubject,
          filteredAvailtime,
          prisma,
        ).then(async (resolvedIds) => {
          const studentLocationsData = resolvedIds.locationIds.map((locId) => ({
            studentId: studentId,
            locationId: locId,
          }));
          const studentSubjectsData = resolvedIds.subjectIds.map((subId) => ({
            studentId: studentId,
            subjectId: subId,
          }));
          const studentAvailTimesData = resolvedIds.availTimeIds.map(
            (availId) => ({
              studentId: studentId,
              availTimeId: availId,
            }),
          );
          console.log(studentAvailTimesData);
          prisma.$transaction([
            prisma.studentlocation.createMany({ data: studentLocationsData }),
            prisma.studentsubject.createMany({ data: studentSubjectsData }),
            prisma.studentavailtime.createMany({
              data: studentAvailTimesData,
            }),
          ]);
        });
      }

      return {
        func: upsertStudentDetailsRaw(
          availtimes,
          locations,
          subjects,
          this.prisma,
          this.DataService,
        ),
        studentId: studentId,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error creating student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
