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
        `無法取得使用者 ID 的設定文件 ${userId}`,
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
        '更新個人資料失敗',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
