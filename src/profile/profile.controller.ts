import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':userid')
  async getProfile(@Param('userid') userid: string) {
    return this.profileService.getProfile(parseInt(userid));
  }

  @Patch()
  async updateProfile(@Body() requestBody) {
    return this.profileService.updateProfile(requestBody);
  }
}
