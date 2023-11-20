import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard'; // Import the JwtAuthGuard

@Controller('favourite')
@UseGuards(JwtAuthGuard)
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Get('tutor/:userid')
  async getUserTutor(@Request() req) {
    const authenticatedUserId = req.userid; // Access the userId from the request object
    // Use authenticatedUserId as needed
    return this.favouriteService.getFavouriteTutor(
      parseInt(authenticatedUserId),
    );
  }

  @Get('cases/:userid')
  async getUserCases(@Request() req) {
    const authenticatedUserId = req.userid; // Access the userId from the request object
    // Use authenticatedUserId as needed
    return this.favouriteService.getFavouriterCase(
      parseInt(authenticatedUserId),
    );
  }

  @Post('addStudent')
  async addFavouriteStudent(
    @Body() body: { userid: number; studentid: number },
  ) {
    return this.favouriteService.addFavouriteStudent(
      body.userid,
      body.studentid,
    );
  }

  @Delete('removeStudent')
  async removeFavouriteStudent(
    @Body() body: { userid: number; studentid: number },
  ) {
    return this.favouriteService.removeFavouriteStudent(
      body.userid,
      body.studentid,
    );
  }

  @Post('addTutor')
  async addFavouriteTutor(@Body() body: { userid: number; tutorid: number }) {
    return this.favouriteService.addFavouriteTutor(body.userid, body.tutorid);
  }

  @Delete('removeTutor')
  async removeFavouriteTutor(
    @Body() body: { userid: number; tutorid: number },
  ) {
    return this.favouriteService.removeFavouriteTutor(
      body.userid,
      body.tutorid,
    );
  }
}
