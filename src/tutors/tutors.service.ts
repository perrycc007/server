// tutors.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DataService } from '../helper/helperFunction.service';

@Injectable()
export class TutorsService {
  constructor(private readonly DataService: DataService) {}
  private prisma = new PrismaClient();

  async findAllTutors(): Promise<any> {
    const result = this.prisma.tutor.findMany({
      where: {
        status: 'open',
      },
      orderBy: {
        lastOnline: 'desc',
      },
      include: {
        location: true,
        availtime: true,
        subject: true,
      },
    });
    result.then((data) => {
      const object = this.DataService.formatObject(data, 'tutor');
      console.log(object);
      return object;
    });
  }

  async getFavouriteTutors(userId: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        userid: userId,
      },
    });
    const tutorIdList = user ? (user.favouritetutorid as number[]) : [];

    const result = this.prisma.tutor.findMany({
      orderBy: {
        lastOnline: 'desc',
      },
      where: {
        tutorid: { in: tutorIdList },
      },
      include: {
        location: true,
        availtime: true,
        subject: true,
      },
    });
    result.then((data) => {
      const object = this.DataService.formatObject(data, 'tutor');
      console.log(object);
      return object;
    });
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
      formatData[0];
    let date_ob = new Date();
    return this.prisma.tutor.upsert({
      where: {
        tutorid: userid,
      },
      update: {
        ...tutorinfo,
        lastOnline: date_ob,
        availtime: {
          update: { ...availtime },
        },
        location: { update: { ...location } },
        subject: { update: { ...subject } },
      },
      include: {
        location: true,
        availtime: true,
        subject: true,
      },
      create: {
        user: {
          connect: {
            userid: information.userid, // Assuming you want to connect to an existing 'user' record with userid 2
          },
        },
        ...tutorinfo,
        lastOnline: date_ob,
        availtime: {
          create: { ...availtime },
        },
        location: { create: { ...location } },
        subject: { create: { ...subject } },
      },
    });
  }

  async findTutorsByPreference(
    preference: any,
    location: [],
    subject: [],
  ): Promise<any> {
    const info = this.DataService.PrefereceToDBFormat(location, subject);

    const tutors = await this.prisma.tutor.findMany({
      where: {
        AND: [
          preference,
          { location: info.location },
          { subject: info.subject },
        ],
      },
    });
    return tutors;
  }
}
