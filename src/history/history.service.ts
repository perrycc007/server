import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DataService } from '../helper/helperFunction.service';

@Injectable()
export class HistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly DataService: DataService,
  ) {}
  async getHistoryByUserId(userId: string) {
    // Implement the logic for getting history by user ID
    // You can reuse your existing logic from the Express router
    const result = this.prisma.student.findMany({
      where: {
        userid: parseInt(userId),
      },
      include: {
        location: true,
        availtime: true,
        subject: true,
      },
    });
    result.then((data) => {
      const object = this.DataService.formatObject(data, 'student');
      console.log(object);
      return object;
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
