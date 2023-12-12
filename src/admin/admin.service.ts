import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async toggleCheck(req: any) {
    try {
      // Implement the logic for toggling check here
      // You can reuse your existing logic from the Express router

      await this.prisma.$queryRaw`
        UPDATE matchTable
        SET checkStatus = ${req.checkStatus}
        WHERE idmatch = ${req.idmatch};
      `;

      // Check if the update was successful or not and handle errors accordingly
      // You can also return a success message or a meaningful response here
      // based on your application's requirements.
    } catch (error) {
      // Handle the error and throw a custom error if needed
      throw new Error('Failed to toggle check: ' + error.message);
    }
  }

  async toggleAvail(req: any) {
    try {
      // Implement the logic for toggling availability here
      // You can reuse your existing logic from the Express router

      await this.prisma.$queryRaw`
        UPDATE matchTable
        SET availability = ${req.availability}
        WHERE idmatch = ${req.idmatch};
      `;

      // Check if the update was successful or not and handle errors accordingly
      // You can also return a success message or a meaningful response here
      // based on your application's requirements.
    } catch (error) {
      // Handle the error and throw a custom error if needed
      throw new Error('Failed to toggle availability: ' + error.message);
    }
  }

  async updateTutorVerify(req: any) {
    try {
      // Implement the logic for updating tutor verification here
      // You can reuse your existing logic from the Express router

      const tutorId = req.tutorId;
      const verify = req.verify;
      await this.prisma.tutor.update({
        where: {
          tutorId: parseInt(tutorId),
        },
        data: {
          verify: verify,
        },
      });

      // Check if the update was successful or not and handle errors accordingly
      // You can also return a success message or a meaningful response here
      // based on your application's requirements.
    } catch (error) {
      // Handle the error and throw a custom error if needed
      throw new NotFoundException('Tutor not found: ' + error.message);
    }
  }
}
