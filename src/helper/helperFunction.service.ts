import { Injectable } from '@nestjs/common';
import { location } from '../helper/location';
import { subject } from '../helper/subject';
import { timeslot } from '../helper/timeslot';
@Injectable()
export class DataService {
  formatObject(data) {
    // Assuming timeslot, subject, and location arrays are imported or defined earlier in the code

    function convertInputToOutput(data) {
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
        return {
          id: inputEntry.id,
          studentid: inputEntry.studentid,
          tutorid: inputEntry.tutorid,
          location: entryLocations,
          availtime: entryTimeslots,
          subject: entrySubjects,
        };
      });

      return outputArray;
    }

    // Example input
    // const inputObject = [
    //   {
    //     "id": 1,
    //     "studentid": null,
    //     "tutorid": 1,
    //     "CentralMidLevels": true,
    //     "PokFuLam": false,
    //     "Sun0900": true,
    //     "Mon1000": false,
    //     "English": false,
    //     "Chinese": true,
    //   },
    //   {
    //     "id": 2,
    //     "studentid": null,
    //     "tutorid": 1,
    //     "CentralMidLevels": false,
    //     "PokFuLam": true,
    //     "Sun0900": false,
    //     "Mon1000": true,
    //     "English": true,
    //     "Chinese": false,
    //   }
    // ];

    const output = convertInputToOutput(data);
    return output;
  }

  ToDBFormat(data) {
    // Assuming timeslot, subject, and location arrays are imported or defined earlier in the code

    function initializeTemplate() {
      const template: { [key: string]: boolean } = {};

      location.forEach((loc) => (template[loc] = false));
      subject.forEach((sub) => (template[sub] = false));
      timeslot.forEach((time) => (template[time] = false));

      return template;
    }

    function transformArray(inputArray: any[]): any[] {
      return inputArray.map((item) => {
        const transformed = {
          id: item.id,
          studentid: item.studentid,
          tutorid: item.tutorid,
          ...initializeTemplate(),
        };

        item.location.forEach((loc) => (transformed[loc] = true));
        item.availtime.forEach((time) => (transformed[time] = true));
        item.subject?.forEach((sub) => (transformed[sub] = true)); // Add this line if subjects are included in input

        return transformed;
      });
    }

    const inputArray = transformArray(data);
    console.log(inputArray);
    return inputArray;
    // Example input
    // const inputArray = [
    //   {
    //     "id": 1,
    //     "studentid": null,
    //     "tutorid": 1,
    //     "location": ['CentralMidLevels'],
    //     "availtime": ['Sun0900']
    //   },
    //   {
    //     "id": 2,
    //     "studentid": null,
    //     "tutorid": 1,
    //     "location": ['PokFuLam'],
    //     "availtime": ['Mon1000']
    //   }
    // ];
    // Example output array
    // const outputArray = [
    //   {
    //     id: 1,
    //     studentid: null,
    //     tutorid: 1,
    //     CentralMidLevels: true,
    //     PokFuLam: false,
    //     Sun0900: true,
    //     Mon1000: false,
    //     English: false,
    //     Chinese: true,
    //   },
    //   {
    //     id: 1,
    //     studentid: null,
    //     tutorid: 1,
    //     CentralMidLevels: false,
    //     PokFuLam: true,
    //     Sun0900: false,
    //     Mon1000: true,
    //     English: true,
    //     Chinese: false,
    //   },
    // ];
  }
}
