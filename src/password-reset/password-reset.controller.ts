import { Controller, Post, Param, Body } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

@Controller('password-update')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post(':userid')
  async updatePassword(@Param('userid') userid: string, @Body() requestBody) {
    return this.passwordResetService.resetPassword(userid, requestBody.password);
  }
}
