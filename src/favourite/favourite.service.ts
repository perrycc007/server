import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a PrismaService

@Injectable()
export class FavouriteService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllStudentsWithFavourites(userid: number) {
    return this.prismaService.student.findMany({
      include: {
        favourites: {
          where: { userid: userid },
          select: { idfavourite: true },
        },
      },
    });
  }

  async findAllTutorsWithFavourites(userid: number) {
    return this.prismaService.tutor.findMany({
      include: {
        favourites: {
          where: { userid: userid },
          select: { idfavourite: true },
        },
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

  async getFavouriterCase(userid: number) {
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

  async addFavouriteStudent(userid: number, studentId: number) {
    return this.prismaService.favourite.create({
      data: {
        userid: userid,
        studentid: studentId,
      },
    });
  }

  async removeFavouriteStudent(userid: number, studentId: number) {
    await this.prismaService.favourite.deleteMany({
      where: {
        userid: userid,
        studentid: studentId,
      },
    });
  }

  async addFavouriteTutor(userid: number, tutorid: number) {
    return this.prismaService.favourite.create({
      data: {
        userid: userid,
        tutorid: tutorid,
      },
    });
  }

  async removeFavouriteTutor(userid: number, tutorid: number) {
    await this.prismaService.favourite.deleteMany({
      where: {
        userid: userid,
        tutorid: tutorid,
      },
    });
  }
}
