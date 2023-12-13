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

@Controller('password-forget')
export class PasswordForgetController {
  constructor(private readonly passwordForgetService: PasswordForgetService) {}

  @Post()
  async sendResetLink(@Body() requestBody) {
    try {
      if (!requestBody.email) {
        throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
      }

      return await this.passwordForgetService.sendResetLink(requestBody.email);
    } catch (error) {
      throw new HttpException(
        'Failed to send reset link',
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
        'Token verification failed',
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
        throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
      }

      return await this.passwordForgetService.resetPassword(
        userId,
        token,
        requestBody.password,
      );
    } catch (error) {
      throw new HttpException(
        'Password reset failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
