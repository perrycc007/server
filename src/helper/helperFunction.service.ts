import { Injectable } from '@nestjs/common';
import { location } from '../helper/location';
import { subject } from '../helper/subject';
import { timeslot } from '../helper/timeslot';
@Injectable()
export class DataService {
  // Assuming timeslot, subject, and location arrays are imported or defined earlier in the code

  QueryBuilder(data: any, type: string, category: string) {
    function generateLocationFilter(itemArray) {
      if (type == 'locations') {
        const lConditions = itemArray.map((item) => `l.location = '${item}'`);
        return `(${lConditions.join(' OR ')})`;
      } else if (type == 'subjects' && category == 'student') {
        const lConditions = itemArray.map((item) => `su.name = '${item}'`);
        return `(${lConditions.join(' OR ')})`;
      } else if (type == 'subjects' && category == 'tutor') {
        const lConditions = itemArray.map((item) => `s.name = '${item}'`);
        return `(${lConditions.join(' OR ')})`;
      }
    }
    const outputString = generateLocationFilter(data);

    return outputString;
  }

  LowestFeeQuery(lowestfee: any) {
    if (lowestfee == null) {
      return;
    } else {
      const outputString = `s.highestfee >= ${lowestfee} AND`;
      return outputString;
    }
  }
  HighestFeeQuery(highestfee: any) {
    if (highestfee == null) {
      return;
    } else {
      const outputString = `t.lowestfee <= ${highestfee} AND`;
      return outputString;
    }
  }

  ResolveIds(locations, subjects, availtimes, prisma) {
    async function resolveIds(locations, subjects, availtimes, prisma) {
      // Query each table once
      const allLocations = await prisma.location.findMany({
        select: { locationId: true, location: true },
      });
      const allSubjects = await prisma.subject.findMany({
        select: { subjectId: true, name: true },
      });
      const allAvailTimes = await prisma.availtime.findMany({
        select: { id: true, day: true, time: true },
      });

      // Map names to IDs
      const locationIds = locations
        .map((loc) => allLocations.find((l) => l.location === loc)?.locationId)
        .filter(Boolean);
      const subjectIds = subjects
        .map((sub) => allSubjects.find((s) => s.name === sub)?.subjectId)
        .filter(Boolean);
      const availTimeIds = availtimes
        .map((at) => {
          const [day, time] = at.split('-');

          return allAvailTimes.find(
            (avt) => avt.day === day && avt.time === time,
          )?.id;
        })
        .filter(Boolean);

      return { locationIds, subjectIds, availTimeIds };
    }
    return resolveIds(locations, subjects, availtimes, prisma);
  }
}

//   Example input
//   const inputArray = [
// {
//   "id": 1,
//   "studentId": null,
//   "tutorId": 1,
//   "location": ['中半山','薄扶林'],
//   "availtime": ['SUN0900','MON1000'],
//   "subject": ['文科','商科']
// },
//     {
//       "id": 2,
//       "studentId": null,
//       "tutorId": 1,
//       "location": ['PokFuLam'],
//       "availtime": ['Mon1000']
//     }
//   ];
//   Example output array
//   const outputArray = [
//     {
//       id: 1,
//       studentId: null,
//       tutorId: 1,
//       location: [{ CentralMidLevels: true, PokFuLam: false }],
//       availtime: [{ Sun0900: true, Mon1000: false }],
//       subject: [{ English: false, Chinese: true }],
//     },
//     {
//       id: 1,
//       studentId: null,
//       tutorId: 1,
//       location: [{ CentralMidLevels: false, PokFuLam: true }],
//       availtime: [{ Sun0900: false, Mon1000: true }],
//       subject: [{ English: true, Chinese: false }],
//     },
//   ];
// }
