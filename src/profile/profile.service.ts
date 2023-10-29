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

    if (result !== null) {
      return result;
    } else {
      return { userid: userid, ...dummyProfile };
    }
  }

  async updateProfile(requestBody: any) {
    const reqUserid = requestBody.userid;
    let { userid, idprofile, ...information } = requestBody.information;
    let { availtime, country, lastOnline, ...requiredInfo } = information;
    const isEmpty = Object.values(requiredInfo).some((x) => x == null || x == "");
    if (isEmpty) {
      throw new Error('Please fill in all fields');
    }
    let agreewith = information.agreewith;
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
