import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a PrismaService

@Injectable()
export class ApplyService {
  constructor(private readonly prismaService: PrismaService) {}

  async createApply(requestBody) {
    try {
      const { subject, place, userid } = requestBody;
      const result = await this.prismaService.apply.create({
        data: {
          subject,
          place,
          userid,
        },
      });

      return { result };
    } catch (error) {
      // Handle any errors here and return an appropriate response
      throw new Error('Failed to create apply entry');
    }
  }
}
