import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard'; // Import the JwtAuthGuard

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':userid')
  async getProfile(@Param('userid') userid: string) {
    console.log(userid);
    return this.profileService.getProfile(parseInt(userid));
  }

  @Patch()
  async updateProfile(@Body() requestBody) {
    return this.profileService.updateProfile(requestBody);
  }
}
