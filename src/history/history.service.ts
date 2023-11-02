import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getHistoryByUserId(userId: string) {
    // Implement the logic for getting history by user ID
    // You can reuse your existing logic from the Express router
    return this.prisma.student.findMany({
        where: {
          userid: parseInt(userId),
        },
      });  
}

  async updateCaseStatus(studentId: string, status: string) {
    // Implement the logic for updating case status
    // You can reuse your existing logic from the Express router

    return this.prisma.student.update({
      where: {
        studentid: parseInt(studentId),
      },
      data: {
        status: status,
      },
    });
   
}

  async updateTutorStatus(tutorId: string, status: string) {
    // Implement the logic for updating tutor status
    // You can reuse your existing logic from the Express router
    return this.prisma.tutor.update({
        where: {
          tutorid: parseInt(tutorId),
        },
        data: {
          status: status,
        },
      });  
}
}
