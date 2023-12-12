import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DataService } from '../helper/helperFunction.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name); // Create a logger instance

  constructor(
    private readonly prisma: PrismaService,
    private readonly dataService: DataService, // Fix the DataService injection
  ) {}

  async getHistoryByUserId(userId: string) {
    try {
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
    } catch (error) {
      this.logger.error(`Error in getHistoryByUserId: ${error.message}`);
      throw error;
    }
  }

  async updateCaseStatus(studentId: string, status: any) {
    try {
      return this.prisma.student.update({
        where: {
          studentId: parseInt(studentId),
        },
        data: {
          status: status,
        },
      });
    } catch (error) {
      this.logger.error(`Error in updateCaseStatus: ${error.message}`);
      throw error;
    }
  }

  async updateTutorStatus(tutorId: string, status: any) {
    try {
      return this.prisma.tutor.update({
        where: {
          tutorId: parseInt(tutorId),
        },
        data: {
          status: status,
        },
      });
    } catch (error) {
      this.logger.error(`Error in updateTutorStatus: ${error.message}`);
      throw error;
    }
  }
}
