import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dummyProfile } from '../DUMMY/dummyProfile';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfile(userId: number) {
    const result = await this.prismaService.profile.findUnique({
      where: {
        userId: userId,
      },
    });
    console.log(result);
    if (result !== null) {
      return result;
    } else {
      return { userId: userId, ...dummyProfile };
    }
  }

  async updateProfile(requestBody: any) {
    const requserId = requestBody.userId;
    let { userId, ...information } = requestBody;
    let { availtime, country, lastOnline, ...requiredInfo } = information;
    const isEmpty = Object.values(requiredInfo).some(
      (x) => x == null || x == '',
    );
    if (isEmpty) {
      throw new Error('Please fill in all fields');
    }
    let agreewith = true;
    let date_ob = new Date();

    const result = await this.prismaService.profile.upsert({
      where: {
        userId: requserId,
      },
      update: {
        ...information,
        lastOnline: date_ob,
      },
      create: {
        userId: requserId,
        ...information,
        lastOnline: date_ob,
        agreewith: `${agreewith}`,
      },
    });
    return result;
  }
}
