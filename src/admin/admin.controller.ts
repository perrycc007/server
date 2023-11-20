import { Controller, Patch, Body, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAdminGuard } from '../auth/guard/admin.guard';
@Controller('admin')
// @UseGuards(JwtAdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('toggleCheck')
  async toggleCheck(@Body() requestBody) {
    return this.adminService.toggleCheck(requestBody);
  }

  @Patch('toggleAvail')
  async toggleAvail(@Body() requestBody) {
    return this.adminService.toggleAvail(requestBody);
  }

  @Patch('updateTutorVerify')
  async updateTutorVerify(@Body() requestBody) {
    return this.adminService.updateTutorVerify(requestBody);
  }
}
