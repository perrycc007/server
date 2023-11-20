// tutors.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { dummyTutor } from '../DUMMY/dummyTutor';

import { JwtAuthGuard } from '../auth/guard/auth.guard'; // Import the JwtAuthGuard

@Controller('tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Get()
  async findManyWithStatusOpen() {
    return this.tutorsService.findManyWithStatusOpen();
  }
  @Get('withFavourite')
  async findAllWithFavourite(@Body() requestBody) {
    // Implement logic to fetch students based on query parameters
    return this.tutorsService.findManyWithStatusOpenWithFavourite(
      requestBody.userid,
    );
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

  @Post('filter')
  async findTutorsByPreferences(@Body() requestBody: any) {
    const { lowestfee, locations, highestfee, subjects } =
      requestBody.preference;

    // if (highestteachinglevel[0] == null) {
    //   delete pref.highestteachinglevel;
    // }
    return this.tutorsService.findTutorsByPreference(
      highestfee,
      locations,
      subjects,
    );
  }
  @Post('filterWithFavourite')
  async findTutorsByPreferencesWithFavourite(@Body() requestBody: any) {
    const { lowestfee, locations, highestfee, subjects } =
      requestBody.preference;
    // if (highestteachinglevel[0] == null) {
    //   delete pref.highestteachinglevel;
    // }
    return this.tutorsService.findTutorsByPreferenceWithFavourite(
      highestfee,
      locations,
      subjects,
      requestBody.userid,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateTutor(@Body() updateInfo: any) {
    return this.tutorsService.createOrUpdateTutor(updateInfo.information);
  }
}
