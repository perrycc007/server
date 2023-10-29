import { Controller, Patch, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
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
