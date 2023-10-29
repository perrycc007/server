import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a PrismaService

@Injectable()
export class FavouriteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFavouriterCase(userid: number) {
    return await this.prismaService.user.findUnique({
      where: {
        userid: userid,
      },
    });
  }

  async getFavouriteTutor(userid: number) {
    return await this.prismaService.user.findUnique({
      where: {
        userid: userid,
      },
    });
  }

  async updateFavouriteCase(body) {
    const userid = parseInt(body.userid);
    let caseid = body.caseid;
    caseid = caseid.filter((item) => item != null);
    return await this.prismaService.user.update({
      where: {
        userid: userid,
      },
      data: {
        favouritecaseid: caseid,
      },
    });
  }

  async updateFavouriteTutor(body) {
    const userid = parseInt(body.userid);
    let caseid = body.caseid;
    caseid = caseid.filter((item) => item != null);
    return await this.prismaService.user.update({
      where: {
        userid: userid,
      },
      data: {
        favouritetutorid: caseid,
      },
    });
  }
}
