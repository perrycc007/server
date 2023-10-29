import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PasswordForgetService } from './password-forget.service'; // Update the service import

@Controller('password-forget') // Update the controller path
export class PasswordForgetController { // Rename the class to PasswordForgetController
  constructor(private readonly passwordForgetService: PasswordForgetService) {}
  

  @Post()
  async sendResetLink(@Body() requestBody) {
    return this.passwordForgetService.sendResetLink(requestBody.email);
  }

  @Get(':userid/:token')
  async verifyToken(@Param('userid') userid: string, @Param('token') token: string) {
    return this.passwordForgetService.verifyToken(userid, token);
  }

  @Post(':userid/:token')
  async resetPassword(@Param('userid') userid: string, @Param('token') token: string, @Body() requestBody) {
    return this.passwordForgetService.resetPassword(userid, token, requestBody.password);
  }
}
