const newrelic = require('newrelic');
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dummyProfile } from '../DUMMY/dummyProfile';
import { UpdateProfileDto } from './dto/profile.dto';
@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}
  private isFormComplete(profileInfo: UpdateProfileDto): boolean {
    const requiredFieldsWithValidation = [
      'findus',
      'language',
      'name',
      'nationality',
      'phoneno',
      'address',
      'emergencycontact',
      'emergencyrelationship',
      'emergencyphone',
    ];

    return requiredFieldsWithValidation.every((field) => {
      const value = profileInfo[field];
      return (
        value !== null &&
        value !== '' &&
        JSON.stringify(value) !== '[]' &&
        value !== undefined
      );
    });
  }
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

      if (!this.isFormComplete(requiredInfo)) {
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
          completeFormStatus: true,
        },
        create: {
          userId: userId,
          ...information,
          lastOnline: date_ob,
          completeFormStatus: true,
          agreewith: `${agreewith}`,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to update profile', error.message);
    }
  }
}
