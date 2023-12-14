import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':userId')
  async getProfile(@Param('userId') userId: string) {
    try {
      console.log(userId);
      return await this.profileService.getProfile(parseInt(userId));
    } catch (error) {
      throw new HttpException(
        `Failed to get profile for user ID ${userId}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch()
  async updateProfile(@Body() requestBody) {
    try {
      console.log(requestBody);
      return await this.profileService.updateProfile(requestBody);
    } catch (error) {
      throw new HttpException(
        'Failed to update profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
