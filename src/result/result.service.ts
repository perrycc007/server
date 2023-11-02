import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  async getResultByPage(page: number) {
    // Implement the logic for getting results by page
    // You can reuse your existing logic from the Express router
    const result = await this.prisma.student.findMany({
      where: {
        status: 'open',
      },
      orderBy: [
        {
          lastOnline: 'desc',
        },
      ],
      include: {
        matches: {
          include: {
            tutor: {
              include: {
                user: {
                  include: {
                    profile: true,
                  },
                },
              },
            },
          },
        },
        // user: {
        //   include: {
        //     profile: true
        //   }
        // }
      },
      skip: page,
      take: 1,
    });

    console.log(result);
  }
  async getResultByStudentId(studentId: number) {
    // Implement the logic for getting results by student ID
    // You can reuse your existing logic from the Express router
    const result = await this.prisma.student.findUnique({
      where: {
        studentid: studentId,
      },
      include: {
        matches: {
          include: {
            tutor: {
              include: {
                user: {
                  include: {
                    profile: true,
                  },
                },
              },
            },
          },
        },
        // user: {
        //   include: {
        //     profile: true
        //   }
        // }
      },
    });

    console.log(result);
    // return("error");
  }

  //   async getResultByTutorId(tutorid: number) {
  //     // Implement the logic for getting results by student ID
  //     // You can reuse your existing logic from the Express router
  //     const result = await this.prisma.tutor.findUnique({
  //       where: {
  //         tutorid: tutorid,
  //       },
  //       include: {
  //         matches: {
  //           include: {
  //             student: {
  //               include: {
  //                 user: {
  //                   include: {
  //                     profile: true
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         },
  //         user: {
  //           include: {
  //             profile: true
  //           }
  //         }
  //       },
  //     });

  //       console.log(result)
  //       // return("error");
  //     }

  async closeLastOnlineMoreThan6months() {
    await this.prisma.student.updateMany({
      where: {
        lastOnline: {
          lt: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
        },
        status: 'open',
      },
      data: {
        status: 'closed',
      },
    });
    await this.prisma.tutor.updateMany({
      where: {
        lastOnline: {
          lt: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
        },
        status: 'open',
      },
      data: {
        status: 'closed',
      },
    });
  }
}
