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
        throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
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
          'Failed to reset password',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
