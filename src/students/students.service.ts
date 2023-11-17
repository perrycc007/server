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
    // const result = this.prismaService.student.findMany({
    //   where: { status: 'open' },
    //   orderBy: { lastOnline: 'desc' },
    //   include: {
    //     location: true,
    //     availtime: true,
    //     subject: true,
    //   },
    // });
    // result.then((data) => {
    //   const object = this.DataService.formatObject(data, 'student');
    //   console.log(object);
    //   return object;
    // });
  }
  async findOne(casesid: string) {
    // Implement logic to fetch a student by ID using Prisma
    // const result = await this.prismaService.student.findUnique({
    //   where: {
    //     studentid: JSON.parse(casesid),
    //   },
    //   include: {
    //     location: true,
    //     availtime: true,
    //     subject: true,
    //   },
    // });
    // const object = this.DataService.formatObject([result], 'student');
    // console.log(object);
    // return object;
  }

  async findStudentByPreference(
    preference: any,
    location: [],
    subject: [],
  ): Promise<any> {}

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
            console.log(at);
            const [day, time] = at.split('-');

            return allAvailTimes.find(
              (avt) => avt.day === day && avt.time === time,
            )?.id;
          })
          .filter(Boolean);
        console.log(availTimeIds);
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
      ),
      studentid: studentid,
    };
  }

  async test() {
    return;
  }
}
