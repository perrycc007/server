import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dummyProfile } from '../DUMMY/dummyProfile';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfile(userid: number) {
    const result = await this.prismaService.profile.findUnique({
      where: {
        userid: userid,
      },
    });
    console.log(result);
    if (result !== null) {
      return result;
    } else {
      return { userid: userid, ...dummyProfile };
    }
  }

  async updateProfile(requestBody: any) {
    console.log(requestBody);
    const reqUserid = requestBody.userid;
    let { userid, ...information } = requestBody;
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
        userid: reqUserid,
      },
      update: {
        ...information,
        lastOnline: date_ob,
      },
      create: {
        userid: reqUserid,
        ...information,
        lastOnline: date_ob,
        agreewith: `${agreewith}`,
      },
    });

    return result;
  }
}
