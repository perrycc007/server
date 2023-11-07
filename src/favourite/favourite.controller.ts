import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { FavouriteService } from './favourite.service';

@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Get('tutor/:userid')
  async getUserTutor(@Param('userid') userid: string) {
    return this.favouriteService.getFavouriteTutor(parseInt(userid));
  }

  @Get('cases/:userid')
  async getUserCases(@Param('userid') userid: string) {
    return this.favouriteService.getFavouriterCase(parseInt(userid));
  }

  @Patch('case')
  async updateUserCase(@Body() body) {
    return this.favouriteService.updateFavouriteCase(body);
  }

  @Patch('tutor')
  async updateUserTutor(@Body() body) {
    return this.favouriteService.updateFavouriteTutor(body);
  }
}
