import { Controller, Post, Param, Body } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

@Controller('password-update')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post(':userId')
  async updatePassword(@Param('userId') userId: string, @Body() requestBody) {
    return this.passwordResetService.resetPassword(
      userId,
      requestBody.password,
    );
  }
}
