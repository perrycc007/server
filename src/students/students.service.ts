import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a PrismaService

@Injectable()
export class StudentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(query) {
    // Implement logic to fetch students based on query parameters using Prisma
    // Parse the query object and apply filters as needed
    return await this.prismaService.student.findMany({
      // Add your Prisma queries here
    });
  }

  async findOne(casesid: string) {
    // Implement logic to fetch a student by ID using Prisma
    return await this.prismaService.student.findUnique({
      where: {
        studentid: JSON.parse(casesid),
      },
    });
  }

  async create(requestBody) {
    // Implement logic to create a student using Prisma
    return await this.prismaService.student.create({
      data: {
        // Add student data from the request body
      },
    });
  }
}

