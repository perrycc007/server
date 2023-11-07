// tutors.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TutorsService {
  private prisma = new PrismaClient();

  async findAllTutors(): Promise<any> {
    return this.prisma.tutor.findMany({
      where: {
        status: 'open',
      },
      orderBy: {
        lastOnline: 'desc',
      },
    });
  }

  async getFavouriteTutors(userId: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        userid: userId,
      },
    });
    const tutorIdList = user ? (user.favouritetutorid as number[]) : [];

    return this.prisma.tutor.findMany({
      orderBy: {
        lastOnline: 'desc',
      },
      where: {
        tutorid: { in: tutorIdList },
      },
    });
  }

  async getTutorByUserId(userId: number, dummyTutor: any): Promise<any> {
    const result = await this.prisma.tutor.findUnique({
      where: {
        tutorid: userId,
      },
    });
    return result !== null ? result : { userid: userId, ...dummyTutor };
  }

  async createOrUpdateTutor(information: any): Promise<any> {
    console.log(information);
    const { userid, tutorid, availtime, ...tutorinfo } = information;
    let date_ob = new Date();
    return this.prisma.tutor.upsert({
      where: {
        tutorid: userid,
      },
      update: {
        ...tutorinfo,
        lastOnline: date_ob,
      },
      create: {
        user: {
          connect: {
            userid: information.userid, // Assuming you want to connect to an existing 'user' record with userid 2
          },
        },
        ...tutorinfo,
        lastOnline: date_ob,
      },
    });
  }

  async findTutorsByPreference(
    preference: any,
    location: string[],
    subject: string[],
  ): Promise<any> {
    const tutors = await this.prisma.tutor.findMany({ where: preference });

    let found =
      location[0] != null
        ? tutors.map((key) => {
            if (
              JSON.parse(key.location as string).some(
                (item) => location.indexOf(item) >= 0,
              )
            ) {
              return key;
            }
          })
        : tutors;
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
}
