import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PasswordForgetService } from './password-forget.service';

@Controller('forgetPassword')
export class PasswordForgetController {
  constructor(private readonly passwordForgetService: PasswordForgetService) {}

  @Post()
  async sendResetLink(@Body() requestBody) {
    try {
      if (!requestBody.email) {
        throw new HttpException('電子郵件為必填項', HttpStatus.BAD_REQUEST);
      }

      return await this.passwordForgetService.sendResetLink(requestBody.email);
    } catch (error) {
      throw new HttpException(
        '發送重置連結失敗',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':userId/:token')
  async verifyToken(
    @Param('userId') userId: string,
    @Param('token') token: string,
  ) {
    try {
      return await this.passwordForgetService.verifyToken(userId, token);
    } catch (error) {
      throw new HttpException(
        'Token 驗證失敗',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':userId/:token')
  async resetPassword(
    @Param('userId') userId: string,
    @Param('token') token: string,
    @Body() requestBody,
  ) {
    try {
      if (!requestBody.password) {
        throw new HttpException('密碼是必需的', HttpStatus.BAD_REQUEST);
      }

      return await this.passwordForgetService.resetPassword(
        userId,
        token,
        requestBody.password,
      );
    } catch (error) {
      throw new HttpException('密碼重置失敗', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
