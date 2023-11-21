import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async toggleCheck(req: any) {
    // Implement the logic for toggling check here
    // You can reuse your existing logic from the Express router

    return this.prisma.$queryRaw`
    UPDATE matchTable
    SET checkStatus = ${req.checkStatus}
    WHERE idmatch = ${req.idmatch};
`;
  }

  async toggleAvail(req: any) {
    // Implement the logic for toggling availability here
    // You can reuse your existing logic from the Express router
    return this.prisma.$queryRaw`
    UPDATE matchTable
    SET availability = ${req.availability}
    WHERE idmatch = ${req.idmatch};
`;
  }

  async updateTutorVerify(req: any) {
    // Implement the logic for updating tutor verification here
    // You can reuse your existing logic from the Express router
    const tutorId = req.tutorId;
    const verify = req.verify;
    return this.prisma.tutor.update({
      where: {
        tutorId: parseInt(tutorId),
      },
      data: {
        verify: verify,
      },
    });
  }
}
