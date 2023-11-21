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
    const result = await this.prisma.$queryRaw`
    SELECT 
    s.*,
    GROUP_CONCAT(DISTINCT l.location SEPARATOR ',') AS locations,
    GROUP_CONCAT(DISTINCT su.name SEPARATOR ',') AS subjects
    FROM 
      tutorperry.student s
    LEFT JOIN 
      tutorperry.studentLocation sl ON s.studentId = sl.studentId
    LEFT JOIN 
      tutorperry.location l ON sl.locationId = l.locationId
    LEFT JOIN
      tutorperry.studentSubject ss ON s.studentId = ss.studentId
    LEFT JOIN
      tutorperry.subject su ON ss.subjectId = su.subjectId
    WHERE 

      s.userId = ${userId}
    GROUP BY 
      s.studentId
    ORDER BY 
      s.lastOnline DESC;
  `;
    console.log(result);
    return result;
  }

  async updateCaseStatus(studentId: string, status: any) {
    // Implement the logic for updating case status
    // You can reuse your existing logic from the Express router

    return this.prisma.student.update({
      where: {
        studentId: parseInt(studentId),
      },
      data: {
        status: status,
      },
    });
  }

  async updateTutorStatus(tutorId: string, status: any) {
    // Implement the logic for updating tutor status
    // You can reuse your existing logic from the Express router
    return this.prisma.tutor.update({
      where: {
        tutorId: parseInt(tutorId),
      },
      data: {
        status: status,
      },
    });
  }
}
