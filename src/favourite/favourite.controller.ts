import {
  Controller,
  Get,
  Patch,
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

  @Patch('case')
  async updateUserCase(@Body() body, @Request() req) {
    // Use authenticatedUserId as needed
    return this.favouriteService.updateFavouriteCase(body);
  }

  @Patch('tutor')
  async updateUserTutor(@Body() body, @Request() req) {
    return this.favouriteService.updateFavouriteTutor(body);
  }
}
