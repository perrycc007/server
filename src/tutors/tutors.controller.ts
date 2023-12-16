import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { dummyTutor } from '../DUMMY/dummyTutor';
import { JwtAuthGuard } from '../auth/guard/auth.guard'; // Import the JwtAuthGuard
import { MatchService } from '../match/match.service';
@Controller('tutors')
export class TutorsController {
  constructor(
    private readonly tutorsService: TutorsService,
    private readonly matchService: MatchService,
  ) {}

  @Get()
  async findManyWithStatusOpen() {
    try {
      return await this.tutorsService.findManyWithStatusOpen();
    } catch (error) {
      throw new HttpException(
        'Failed to find tutors with status open',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('withFavourite')
  async findAllWithFavourite(@Body() requestBody: any) {
    try {
      return await this.tutorsService.findManyWithStatusOpenWithFavourite(
        requestBody.userId,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to find all with favourite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Other methods...

  @Post('filter')
  async findTutorsByPreferences(@Body() requestBody: any) {
    try {
      const { lowestfee, locations, highestfee, subjects } =
        requestBody.preference;
      return await this.tutorsService.findTutorsByPreference(
        highestfee,
        locations,
        subjects,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to find tutors by preferences',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('filterWithFavourite')
  async findTutorsByPreferencesWithFavourite(@Body() requestBody: any) {
    try {
      const { lowestfee, locations, highestfee, subjects } =
        requestBody.preference;
      return await this.tutorsService.findTutorsByPreferenceWithFavourite(
        highestfee,
        locations,
        subjects,
        requestBody.userId,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to find tutors by preferences with favourite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateTutor(@Body() updateInfo: any) {
    try {
      const result = await this.tutorsService.createOrUpdateTutor(
        updateInfo.information,
      );
      if (this.tutorsService.isFormComplete(updateInfo.information)) {
        await this.matchService.matchTutor(updateInfo.information);
      }
      return { result };
    } catch (error) {
      throw new HttpException(
        'Failed to update tutor information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':userId')
  async getTutor(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return await this.tutorsService.getTutorByuserId(userId, dummyTutor);
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve tutor with ID ${userId}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('getFavouriteCase/:userId')
  async getFavouriteCase(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return await this.tutorsService.getFavouriteTutors(userId);
    } catch (error) {
      throw new HttpException(
        `Failed to get favourite case for user ID ${userId}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // Continue wrapping other methods in try-catch blocks similarly...
}
