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
            studentid: inputEntry.studentid,
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
            tutorid: inputEntry.tutorid,
            userid: inputEntry.userid,
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

    function transformArray(inputArray: any[], type): any[] {
      return inputArray.map((item) => {
        const locationObj = initializeObject(location);
        item.location.forEach((loc) => (locationObj[loc] = true));

        const timeslotObj = initializeObject(timeslot);
        item.availtime.forEach((time) => (timeslotObj[time] = true));

        const subjectObj = initializeObject(subject);
        // Assuming you have a 'subject' field in your input
        item.subject?.forEach((sub) => (subjectObj[sub] = true));

        if (type == 'student') {
          const outputObject = {
            studentid: item.studentid,
            lowestfrequency: item.lowestfrequency,
            lowestfee: item.lowestfee,
            lowestduration: item.lowestduration,
            language: item.language,
            others: item.others,
            expectation: item.expectation,
            genderrequirement: item.genderrequirement,
            status: item.status,
            highestfee: item.highestfee,
            highestfrequency: item.highestfrequency,
            highestduration: item.highestduration,
            level: item.level,
            location: [locationObj],
            availtime: [timeslotObj],
            subject: [subjectObj],
          };
          return outputObject;
        } else {
          const outputObject = {
            tutorid: item.tutorid,
            userid: item.userid,
            intro: item.intro,
            language: item.language,
            occupation: item.occupation,
            secondaryschool: item.secondaryschool,
            primaryschool: item.primaryschool,
            yearofexperience: item.yearofexperience,
            experience: item.experience,
            highestteachinglevel: item.highestteachinglevel,
            educationallevel: item.educationallevel,
            notes: item.notes,
            schoolcat: item.schoolcat,
            year: item.year,
            publicexamgrade: item.publicexamgrade,
            university: item.university,
            othercert: item.othercert,
            caseid: item.caseid,
            major: item.major,
            subgrade: item.subgrade,
            strength: item.strength,
            highestfee: item.highestfee,
            lowestfee: item.lowestfee,
            matchedbefore: item.matchedbefore,
            status: item.status,
            location: [locationObj],
            availtime: [timeslotObj],
            subject: [subjectObj], // Adjust if 'subject' is not in your input
          };
          return outputObject;
        }
      });
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
}
//   Example input
//   const inputArray = [
//     {
//       "id": 1,
//       "studentid": null,
//       "tutorid": 1,
//       "location": ['CentralMidLevels'],
//       "availtime": ['Sun0900']
//     },
//     {
//       "id": 2,
//       "studentid": null,
//       "tutorid": 1,
//       "location": ['PokFuLam'],
//       "availtime": ['Mon1000']
//     }
//   ];
//   Example output array
//   const outputArray = [
//     {
//       id: 1,
//       studentid: null,
//       tutorid: 1,
//       location: [{ CentralMidLevels: true, PokFuLam: false }],
//       availtime: [{ Sun0900: true, Mon1000: false }],
//       subject: [{ English: false, Chinese: true }],
//     },
//     {
//       id: 1,
//       studentid: null,
//       tutorid: 1,
//       location: [{ CentralMidLevels: false, PokFuLam: true }],
//       availtime: [{ Sun0900: false, Mon1000: true }],
//       subject: [{ English: true, Chinese: false }],
//     },
//   ];
// }
