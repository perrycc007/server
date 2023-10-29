import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Any } from 'typeorm';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  async getResultByPage(page: number) {
    // Implement the logic for getting results by page
    // You can reuse your existing logic from the Express router
    
  const result = await this.prisma.match.findMany({
    // where:{
    //   status: 'open'
    // },

    orderBy: [
      {
        lastOnline: "desc",
      },
    ],
    skip: page,
    take: 1,
  });
  const totalNumberofMatch = await this.prisma.match.count();
  const totalPage = { totalNumberofMatch: totalNumberofMatch };
  // console.log('result',result)
  if (result !== null) {
    let result1 = [];
    // console.log(result)
    // res.json({result})
    for (const match of result) {
      let favouritetutorid: any[] = [];
      let result2 = [];
      const student = await this.prisma.student.findUnique({
        where: {
          studentid: match.studentid,
        },
      });
      if (student != null) {
        const user = await this.prisma.user.findUnique({
          where: {
            userid: student.userid,
          },
        });

        if (user.favouritetutorid != null) {
          // console.log('favouriteTutor',user.favouritetutorid)
          favouritetutorid = user.favouritetutorid;
        }
        result2 = { ...match, ...student, favouritetutorid };
      }
      if (match.availtutor !== null) {
        const tutor = await this.prisma.tutor.findMany({
          where: {
            tutorid: {
              in: match.availtutor,
            },
          },
          orderBy: [
            {
              lastOnline: "desc",
            },
          ],
        });
        // console.log('tutor',tutor)
        for (let teahcer of tutor) {
          const user = await this.prisma.user.findUnique({
            where: {
              userid: teahcer.userid,
            },
          });
          if (user.favouritecaseid != null) {
            // console.log('favouriteCase', user.favouritecaseid)
            const favouritecaseid = user.favouritecaseid;
            teahcer = { ...teahcer, favouritecaseid };
          }
          result2 = { ...result2, tutor };
        }
      }
      // match.availtutor !=null?console.log([2]):''
      result1.push(result2, totalPage);
    }
    console.log(result1, totalPage);
    return.json(result1);
  } else {
    const result = { userid: userid, ...dummyProfile };
  }
  }
  async getResultByStudentId(studentId: number) {
    // Implement the logic for getting results by student ID
    // You can reuse your existing logic from the Express router
    const result = await this.prisma.match.findUnique({
      where: {
        studentid: studentid,
      },
    });
  
    // console.log('result',result)
    if (result !== null) {
      const match = result;
      let result1 = [];
      // console.log(result)
      // res.json({result})
      let favouritetutorid = [];
      let result2 = [];
      const student = await this.prisma.student.findUnique({
        where: {
          studentid: match.studentid,
        },
      });
      if (student != null) {
        const user = await this.prisma.user.findUnique({
          where: {
            userid: student.userid,
          },
        });
  
        if (user.favouritetutorid != null) {
          // console.log('favouriteTutor',user.favouritetutorid)
          favouritetutorid = user.favouritetutorid;
        }
        result2 = { ...match, ...student, favouritetutorid };
      }
      if (match.availtutor !== null) {
        const tutor = await this.prisma.tutor.findMany({
          where: {
            tutorid: {
              in: match.availtutor,
            },
            orderBy: [
              {
                lastOnline: "desc",
              },
            ],
          },
        });
        // console.log('tutor',tutor)
        for (let teahcer of tutor) {
          const user = await this.prisma.user.findUnique({
            where: {
              userid: teahcer.userid,
            },
          });
          if (user.favouritecaseid != null) {
            // console.log('favouriteCase', user.favouritecaseid)
            const favouritecaseid = user.favouritecaseid;
            teahcer = { ...teahcer, favouritecaseid };
          }
          result2 = { ...result2, tutor };
        }
      }
      // match.availtutor !=null?console.log([2]):''
      result1.push(result2);
  
      console.log(result1);
      return(result1);
    } else {
      // console.log(result)
      return("error");
    }
  }
}
