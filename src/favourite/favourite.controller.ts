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

  @Get('tutors/:userId')
  async getUserTutor(@Request() req) {
    const authenticateduserId = req.userId; // Access the userId from the request object
    // Use authenticateduserId as needed
    return this.favouriteService.getFavouriteTutor(
      parseInt(authenticateduserId),
    );
  }

  @Get('students/:userId')
  async getUserCases(@Request() req) {
    const authenticateduserId = req.userId; // Access the userId from the request object
    // Use authenticateduserId as needed
    return this.favouriteService.getFavouriterCase(
      parseInt(authenticateduserId),
    );
  }

  @Post('addStudent')
  async addFavouriteStudent(
    @Body() body: { userId: number; studentId: number },
  ) {
    return this.favouriteService.addFavouriteStudent(
      body.userId,
      body.studentId,
    );
  }

  @Delete('removeStudent')
  async removeFavouriteStudent(
    @Body() body: { userId: number; studentId: number },
  ) {
    return this.favouriteService.removeFavouriteStudent(
      body.userId,
      body.studentId,
    );
  }

  @Post('addTutor')
  async addFavouriteTutor(@Body() body: { userId: number; tutorId: number }) {
    return this.favouriteService.addFavouriteTutor(body.userId, body.tutorId);
  }

  @Delete('removeTutor')
  async removeFavouriteTutor(
    @Body() body: { userId: number; tutorId: number },
  ) {
    return this.favouriteService.removeFavouriteTutor(
      body.userId,
      body.tutorId,
    );
  }
}
