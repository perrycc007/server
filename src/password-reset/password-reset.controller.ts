import {
  Controller,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

@Controller('password-update')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post(':userId')
  async updatePassword(@Param('userId') userId: string, @Body() requestBody) {
    try {
      // Ensure requestBody contains the password and it's not empty
      if (!requestBody.password || requestBody.password.trim() === '') {
        throw new HttpException(
          '密碼是必需的, 重置密碼失敗, 連結可能已過期, 請請求另一個連結。',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.passwordResetService.resetPassword(
        userId,
        requestBody.password,
      );
    } catch (error) {
      // Error handling based on the type of error
      if (error instanceof HttpException) {
        throw error; // Re-throwing the error if it's already an HttpException
      } else {
        throw new HttpException(
          '重置密碼失敗, 連結可能已過期, 請請求另一個連結。',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
