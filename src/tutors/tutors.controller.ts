// tutors.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { dummyTutor } from '../DUMMY/dummyTutor';

@Controller('tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Get()
  async findAll() {
    return this.tutorsService.findAllTutors();
  }

  @Post('getFavouriteCase/:userid')
  async getFavouriteCase(@Param('userid', ParseIntPipe) userId: number) {
    return this.tutorsService.getFavouriteTutors(userId);
  }

  @Get(':userid')
  async getTutor(@Param('userid', ParseIntPipe) userId: number) {
    // Assuming dummyTutor is imported or defined somewhere in the scope
    return this.tutorsService.getTutorByUserId(userId, dummyTutor);
  }

  @Post()
  async findTutorsByPreferences(@Body() preferences: any) {
    const { fee, location, highestteachinglevel, subject } = preferences;
    const pref = {
      highestteachinglevel: highestteachinglevel,
      lowestfee: {
        gte: fee[0],
      },
      status: 'open',
    };
    if (fee[0] == null) {
      delete pref.lowestfee;
    }
    if (highestteachinglevel[0] == null) {
      delete pref.highestteachinglevel;
    }
    return this.tutorsService.findTutorsByPreference(pref, location, subject);
  }

  @Patch()
  async updateTutor(@Body() updateInfo: any) {
    const { information, userid } = updateInfo;
    if (information.subject === undefined) {
      information.subject = JSON.stringify([]);
    }
    return this.tutorsService.createOrUpdateTutor(userid, information);
  }
}
