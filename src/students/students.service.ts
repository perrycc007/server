import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a PrismaService

@Injectable()
export class StudentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyWithStatusOpen(): Promise<any[]> {
    return this.prismaService.student.findMany({
      where: { status: 'open' },
      orderBy: { lastOnline: 'desc' },
    });
  }
  async findOne(casesid: string) {
    // Implement logic to fetch a student by ID using Prisma
    return await this.prismaService.student.findUnique({
      where: {
        studentid: JSON.parse(casesid),
      },
    });
  }
  async findTutorsByPreference(
    preference: any,
    location: string[],
    subject: string[],
  ): Promise<any> {
    const students = await this.prismaService.student.findMany({
      where: preference,
    });

    let found =
      location[0] != null
        ? students.map((key) => {
            if (
              JSON.parse(key.location as string).some(
                (item) => location.indexOf(item) >= 0,
              )
            ) {
              return key;
            }
          })
          
        : students;
    console.log(found);
    found = found.filter((item) => item != null);
    let found1 =
      subject[0] != null
        ? found.map((key) => {
            if (
              JSON.parse(key.subject as string).some(
                (item) => subject.indexOf(item) >= 0,
              )
            ) {
              return key;
            }
          })
        : found;
    // const result = JSON.parse(...s);
    // console.log(found1)
    found1 = found1.filter((item) => item != null);

    return found;
  }

  async findUniqueUserFavouriteCases(userId: number): Promise<any[]> {
    const favourite = await this.prismaService.user.findUnique({
      where: { userid: userId },
    });
    const caseIdList = favourite ? (favourite.favouritecaseid as number[]) : [];
    return this.prismaService.student.findMany({
      where: { studentid: { in: caseIdList } },
      orderBy: { lastOnline: 'desc' },
    });
  }
  async updateStudent(studentId: number, information: any) {
    let date_ob = new Date();

    return this.prismaService.student.update({
      where: { studentid: studentId },
      data: { ...information, lastOnline: date_ob },
    });
  }

  async create(req: any) {
    const information = req.body.information;
    const userid = parseInt(req.body.userid);
    let date_ob = new Date();
    return await this.prismaService.student.create({
      data: {
        userid: userid,
        ...information,
        lastOnline: date_ob,
      },
    });
  }
}
