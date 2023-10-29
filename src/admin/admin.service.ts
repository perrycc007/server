import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async toggleCheck(req: any) {
    // Implement the logic for toggling check here
    // You can reuse your existing logic from the Express router
    return this.prisma.match.update({
      where: {
        idmatch: req.body.idmatch,
      },
      data: {
        checking: req.body.checking,
        checked: req.body.checked,
      },
    });
  }

  async toggleAvail(req: any) {
    // Implement the logic for toggling availability here
    // You can reuse your existing logic from the Express router
    return this.prisma.match.update({
      where: {
        idmatch: req.body.idmatch,
      },
      data: {
        notavailtutor: req.body.notavailtutor,
      },
    });
  }

  async updateTutorVerify(req: any) {
    // Implement the logic for updating tutor verification here
    // You can reuse your existing logic from the Express router
    const tutorid = req.body.tutorid;
    const verify = req.body.verify;
    return this.prisma.tutor.update({
      where: {
        tutorid: parseInt(tutorid),
      },
      data: {
        verify: verify,
      },
    });
  }
}
