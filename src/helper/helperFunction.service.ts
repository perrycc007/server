import { Injectable } from '@nestjs/common';
import { location } from '../helper/location';
import { subject } from '../helper/subject';
import { timeslot } from '../helper/timeslot';
@Injectable()
export class DataService {
  formatObject(data, type) {
    // Assuming timeslot, subject, and location arrays are imported or defined earlier in the code

    function convertInputToOutput(data, type) {
      const outputArray = data.map((inputEntry) => {
        // console.log(inputEntry);
        // Extract locations
        const entryLocations = location.filter((loc) => inputEntry[loc]);
        // console.log(entryLocations);
        // Extract timeslots
        const entryTimeslots = timeslot.filter((time) => inputEntry[time]);

        // Extract subjects
        const entrySubjects = subject.filter((subj) => {
          const formattedSubj = subj.replace(/([A-Z])/g, ' $1').trim(); // Add space before capital letters
          const key = formattedSubj.replace(/\s/g, ''); // Remove spaces to match the key in the input object
          return inputEntry[key];
        });

        // Construct the output object
        if (type == 'student') {
          const outputObject = {
            studentId: inputEntry.studentId,
            lowestfrequency: inputEntry.lowestfrequency,
            lowestfee: inputEntry.lowestfee,
            lowestduration: inputEntry.lowestduration,
            language: inputEntry.language,
            others: inputEntry.others,
            expectation: inputEntry.expectation,
            genderrequirement: inputEntry.genderrequirement,
            status: inputEntry.status,
            highestfee: inputEntry.highestfee,
            highestfrequency: inputEntry.highestfrequency,
            highestduration: inputEntry.highestduration,
            level: inputEntry.level,
            location: entryLocations,
            availtime: entryTimeslots,
            subject: entrySubjects,
          };
          return outputObject;
        } else {
          const outputObject = {
            tutorId: inputEntry.tutorId,
            userId: inputEntry.userId,
            intro: inputEntry.intro,
            language: inputEntry.language,
            occupation: inputEntry.occupation,
            secondaryschool: inputEntry.secondaryschool,
            primaryschool: inputEntry.primaryschool,
            yearofexperience: inputEntry.yearofexperience,
            experience: inputEntry.experience,
            highestteachinglevel: inputEntry.highestteachinglevel,
            educationallevel: inputEntry.educationallevel,
            notes: inputEntry.notes,
            schoolcat: inputEntry.schoolcat,
            year: inputEntry.year,
            publicexamgrade: inputEntry.publicexamgrade,
            university: inputEntry.university,
            othercert: inputEntry.othercert,
            caseid: inputEntry.caseid,
            major: inputEntry.major,
            subgrade: inputEntry.subgrade,
            strength: inputEntry.strength,
            highestfee: inputEntry.highestfee,
            lowestfee: inputEntry.lowestfee,
            matchedbefore: inputEntry.matchedbefore,
            status: inputEntry.status,
            location: entryLocations,
            availtime: entryTimeslots,
            subject: entrySubjects,
          };
          return outputObject;
        }
      });

      return outputArray;
    }

    const output = convertInputToOutput(data, type);
    return output;
  }

  ToDBFormat(data, type) {
    // Assuming timeslot, subject, and location arrays are imported or defined earlier in the code

    function initializeObject(keys: string[]) {
      const obj: { [key: string]: boolean } = {};
      keys.forEach((key) => (obj[key] = false));
      return obj;
    }

    function transformArray(data: any, type): any {
      const locationObj = initializeObject(location);
      data.location.forEach((loc) => (locationObj[loc] = true));

      const timeslotObj = initializeObject(timeslot);
      data.availtime.forEach((time) => (timeslotObj[time] = true));

      const subjectObj = initializeObject(subject);
      // Assuming you have a 'subject' field in your input
      data.subject?.forEach((sub) => (subjectObj[sub] = true));
      let outputObject;
      if (type == 'student') {
        outputObject = {
          studentId: data.studentId,
          lowestfrequency: data.lowestfrequency,
          lowestfee: data.lowestfee,
          lowestduration: data.lowestduration,
          language: data.language,
          others: data.others,
          expectation: data.expectation,
          genderrequirement: data.genderrequirement,
          status: data.status,
          highestfee: data.highestfee,
          highestfrequency: data.highestfrequency,
          highestduration: data.highestduration,
          level: data.level,
          location: locationObj,
          availtime: timeslotObj,
          subject: subjectObj,
        };
      } else {
        outputObject = {
          tutorId: data.tutorId,
          userId: data.userId,
          intro: data.intro,
          language: data.language,
          occupation: data.occupation,
          secondaryschool: data.secondaryschool,
          primaryschool: data.primaryschool,
          yearofexperience: data.yearofexperience,
          experience: data.experience,
          highestteachinglevel: data.highestteachinglevel,
          educationallevel: data.educationallevel,
          notes: data.notes,
          schoolcat: data.schoolcat,
          year: data.year,
          publicexamgrade: data.publicexamgrade,
          university: data.university,
          othercert: data.othercert,
          caseid: data.caseid,
          major: data.major,
          subgrade: data.subgrade,
          strength: data.strength,
          highestfee: data.highestfee,
          lowestfee: data.lowestfee,
          matchedbefore: data.matchedbefore,
          status: data.status,
          location: locationObj,
          availtime: timeslotObj,
          subject: subjectObj, // Adjust if 'subject' is not in your input
        };
      }
      console.log(outputObject);
      return outputObject;
    }

    return transformArray(data, type);
  }

  PrefereceToDBFormat(location: [], subject: []) {
    function initializeObject(keys: string[]) {
      const obj: { [key: string]: boolean } = {};
      keys.forEach((key) => (obj[key] = false));
      return obj;
    }

    function transformArray(location: [], subject: []): any {
      const locationObj = initializeObject(location);
      location.forEach((loc) => (locationObj[loc] = true));

      const subjectObj = initializeObject(subject);
      // Assuming you have a 'subject' field in your input
      subject?.forEach((sub) => (subjectObj[sub] = true));
      return { location: [locationObj], subject: [subjectObj] };
    }
    return transformArray(location, subject);
  }

  RemoveFalse(data: any) {
    const arrayOfObjects = [];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const newObj = {};
        newObj[key] = data[key];
        arrayOfObjects.push(newObj);
      }
    }

    return arrayOfObjects;
  }
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
