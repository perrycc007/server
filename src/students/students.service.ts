import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a PrismaService
import { DataService } from '../helper/helperFunction.service';
@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly DataService: DataService,
  ) {}

  async findManyWithStatusOpen(): Promise<any> {
    const result = await this.prisma.$queryRaw` 
    SELECT 
      s.*,
      GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
      GROUP_CONCAT(DISTINCT subj.name SEPARATOR ',') AS subjects,
      GROUP_CONCAT(DISTINCT CONCAT(at.day, '-', at.time) SEPARATOR ',') AS availtimes
    FROM 
      tutorperry.student s
    LEFT JOIN 
      tutorperry.studentLocation sl ON s.studentid = sl.studentid
    LEFT JOIN 
      tutorperry.location l ON sl.locationId = l.locationId
    LEFT JOIN 
      tutorperry.StudentSubject ss ON s.studentid = ss.studentId
    LEFT JOIN 
      tutorperry.Subject subj ON ss.subjectId = subj.subjectId
    LEFT JOIN 
      tutorperry.StudentAvailTime sat ON s.studentid = sat.studentId
    LEFT JOIN 
      tutorperry.AvailTime at ON sat.availTimeId = at.id

    GROUP BY 
      s.studentid
    ORDER BY 
      s.lastOnline DESC;
  `;
    console.log(result);
    return result;
  }
  async getStudentbyStudentid(studentid: string) {
    const result = await this.prisma.$queryRaw`
    SELECT 
    t.*,
    GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
    GROUP_CONCAT(DISTINCT s.name SEPARATOR ',') AS subjects
    FROM 
      tutorperry.student s
    LEFT JOIN 
      tutorperry.studentlocation sl ON s.studentid = sl.studentid
    LEFT JOIN 
      tutorperry.location l ON sl.locationId = l.locationId
    LEFT JOIN
      tutorperry.studentsubject ss ON s.studentid = ss.studentid
    LEFT JOIN
      tutorperry.subject su ON ss.subjectId = su.subjectId
    WHERE 
      s.status = 'open' AND
      s.studentid = ${studentid}
    GROUP BY 
      s.studentid
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
  }

  async findStudentByPreference(
    lowestfee: any,
    locations: [],
    subjects: [],
  ): Promise<any> {
    const lowestFee = await this.DataService.LowestFeeQuery(lowestfee);
    const locationQuery = await this.DataService.QueryBuilder(
      locations,
      'locations',
      'student',
    );
    const subjectQuery = await this.DataService.QueryBuilder(
      subjects,
      'subjects',
      'student',
    );
    console.log(`
    SELECT
    s.*,
    GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
    GROUP_CONCAT(DISTINCT su.name SEPARATOR ',') AS subjects
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
  `);
    const result = await this.prisma.$queryRaw`
    SELECT
    s.*,
    GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
    GROUP_CONCAT(DISTINCT su.name SEPARATOR ',') AS subjects
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
      s.highestfee >= 60 AND
      s.studentid IN (
        SELECT DISTINCT s.studentid
        FROM tutorperry.student s
        LEFT JOIN tutorperry.studentLocation sl ON s.studentid = sl.studentid
        LEFT JOIN tutorperry.location l ON sl.locationId = l.locationId
        LEFT JOIN tutorperry.studentSubject ss ON s.studentid = ss.studentid
        LEFT JOIN tutorperry.subject su ON ss.subjectId = su.subjectId
        WHERE
        (l.location = '中半山' OR l.location = '北角') AND
        (su.name = '全科' OR su.name = '數學(M2)')
      )
    GROUP BY
      s.studentid
    ORDER BY
      s.lastOnline DESC;
    `;

    console.log(result);
    return result;
  }

  async findUniqueUserFavouriteCases(userId: number): Promise<any> {
    // const favourite = await this.prismaService.user.findUnique({
    //   where: { userid: userId },
    // });
    // const caseIdList = favourite ? (favourite.favouritecaseid as number[]) : [];
    // const result = await this.prismaService.student.findMany({
    //   where: { studentid: { in: caseIdList } },
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
  async updateStudent(information: any): Promise<any> {
    const {
      userid,
      studentid,
      availtimes,
      locations,
      subjects,
      ...studentinfo
    } = information;
    let date_ob = new Date();
    await this.prisma.student.update({
      where: { studentid: studentid },
      data: {
        ...studentinfo,
        lastOnline: date_ob,
        completeFormStatus: false,
      },
    });

    async function upsertStudentDetailsRaw(
      studentid,
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
          studentId: studentid,
          locationId: locId,
        }));
        const studentSubjectsData = resolvedIds.subjectIds.map((subId) => ({
          studentId: studentid,
          subjectId: subId,
        }));
        const studentAvailTimesData = resolvedIds.availTimeIds.map(
          (availId) => ({
            studentId: studentid,
            availTimeId: availId,
          }),
        );

        prisma.$transaction([
          // Delete existing relations
          prisma.studentlocation.deleteMany({
            where: { studentId: studentid },
          }),
          prisma.studentsubject.deleteMany({
            where: { studentId: studentid },
          }),
          prisma.studentavailtime.deleteMany({
            where: { studentId: studentid },
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
      studentid,
      availtimes,
      locations,
      subjects,
      this.prisma,
      this.DataService,
    );
  }

  async createStudent(information: any): Promise<any> {
    const { userid, availtimes, locations, subjects, ...studentinfo } =
      information;
    let date_ob = new Date();
    let studentid = null;
    await this.prisma.student
      .create({
        data: {
          userid: userid,
          ...studentinfo,
          lastOnline: date_ob,
          completeFormStatus: false,
        },
      })
      .then((result) => {
        studentid = result.studentid;
      });

    async function upsertStudentDetailsRaw(
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
          studentId: studentid,
          locationId: locId,
        }));
        const studentSubjectsData = resolvedIds.subjectIds.map((subId) => ({
          studentId: studentid,
          subjectId: subId,
        }));
        const studentAvailTimesData = resolvedIds.availTimeIds.map(
          (availId) => ({
            studentId: studentid,
            availTimeId: availId,
          }),
        );
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
      studentid: studentid,
    };
  }

  async test() {
    return;
  }
}
