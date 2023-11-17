import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a PrismaService
import { DataService } from '../helper/helperFunction.service';
@Injectable()
export class StudentsService {
  constructor(
    private readonly prismaService: PrismaService,
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
  ): Promise<any> {
    // const info = this.DataService.PrefereceToDBFormat(location, subject);
    // const tutors = await this.prismaService.tutor.findMany({
    //   where: {
    //     AND: [
    //       preference,
    //       { location: info.location },
    //       { subject: info.subject },
    //     ],
    //   },
    // });
    // return tutors;
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
  async createOrUpdateStudent(information: any): Promise<any> {
    // console.log(information);
    // const formatData = this.DataService.ToDBFormat(information, 'student');
    // const { userid, studentid, availtime, location, subject, ...studentinfo } =
    //   formatData[0];
    // let date_ob = new Date();
    // return this.prismaService.student.upsert({
    //   where: {
    //     studentid: studentid,
    //   },
    //   update: {
    //     ...studentinfo,
    //     lastOnline: date_ob,
    //     availtime: {
    //       update: { ...availtime },
    //     },
    //     location: { update: { ...location } },
    //     subject: { update: { ...subject } },
    //   },
    //   include: {
    //     location: true,
    //     availtime: true,
    //     subject: true,
    //   },
    //   create: {
    //     user: {
    //       connect: {
    //         userid: information.userid, // Assuming you want to connect to an existing 'user' record with userid 2
    //       },
    //     },
    //     ...studentinfo,
    //     lastOnline: date_ob,
    //     availtime: {
    //       create: { ...availtime },
    //     },
    //     location: { create: { ...location } },
    //     subject: { create: { ...subject } },
    //   },
    // });
  }

  async test() {
    return;
  }
}
