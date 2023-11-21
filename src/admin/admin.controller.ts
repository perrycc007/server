import { Controller, Patch, Body, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAdminGuard } from '../auth/guard/admin.guard';
import { StudentsService } from '../students/students.service';
import { TutorsService } from '../tutors/tutors.service';
import { HistoryService } from '../history/history.service';
@Controller('admin')
// @UseGuards(JwtAdminGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly tutorsService: TutorsService,
    private readonly studentsService: StudentsService,
    private readonly historyService: HistoryService,
  ) {}

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

  // update tutor
  @Patch('updateTutor')
  async updateTutor(@Body() updateInfo: any) {
    return this.tutorsService.createOrUpdateTutor(updateInfo.information);
  }
  // update student
  @Patch('updateStudent')
  async updateStudent(@Body() requestBody) {
    const result = await this.studentsService.updateStudent(requestBody);
    return { result };
  }
  // toggle student status
  @Patch('updateCaseStatus')
  async updateCaseStatus(@Body() body: { studentid: string; status: string }) {
    return this.historyService.updateCaseStatus(body.studentid, body.status);
  }
  // toggle check status
  @Patch('updateTutorStatus')
  async updateTutorStatus(@Body() body: { tutorid: string; status: string }) {
    return this.historyService.updateTutorStatus(body.tutorid, body.status);
  }
}
