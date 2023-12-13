import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dummyProfile } from '../DUMMY/dummyProfile';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfile(userId: number) {
    try {
      const result = await this.prismaService.profile.findUnique({
        where: { userId: userId },
      });
      console.log(result);

      return result !== null ? result : { userId: userId, ...dummyProfile };
    } catch (error) {
      throw new HttpException(
        `Failed to get profile for user ID ${userId}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProfile(requestBody: any) {
    try {
      const { userId, ...information } = requestBody;
      let { availtime, country, lastOnline, ...requiredInfo } = information;
      console.log(requiredInfo);
      const isEmpty = Object.values(requiredInfo).some(
        (x) => x == null || x == '',
      );
      if (isEmpty) {
        throw new HttpException(
          'Please fill in all required fields',
          HttpStatus.BAD_REQUEST,
        );
      }

      let agreewith = true;
      let date_ob = new Date();

      return await this.prismaService.profile.upsert({
        where: { userId: userId },
        update: {
          ...information,
          lastOnline: date_ob,
        },
        create: {
          userId: userId,
          ...information,
          lastOnline: date_ob,
          agreewith: `${agreewith}`,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to update profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
