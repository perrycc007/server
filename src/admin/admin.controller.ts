import { Controller, Patch, Body, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAdminGuard } from '../auth/guard/admin.guard';
import { StudentsService } from '../students/students.service';
import { TutorsService } from '../tutors/tutors.service';
import { HistoryService } from '../history/history.service';
import { ProfileService } from '../profile/profile.service';

@Controller('admin')
// @UseGuards(JwtAdminGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly tutorsService: TutorsService,
    private readonly studentsService: StudentsService,
    private readonly historyService: HistoryService,
    private readonly profileService: ProfileService,
  ) {}

  @Patch('toggleCheck')
  async toggleCheck(@Body() requestBody) {
    try {
      return await this.adminService.toggleCheck(requestBody);
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw error;
    }
  }

  @Patch('toggleAvail')
  async toggleAvail(@Body() requestBody) {
    try {
      return await this.adminService.toggleAvail(requestBody);
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw error;
    }
  }

  @Patch('updateTutorVerify')
  async updateTutorVerify(@Body() requestBody) {
    try {
      return await this.adminService.updateTutorVerify(requestBody);
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw error;
    }
  }
  @Patch('profile')
  async updateProfile(@Body() requestBody) {
    try {
      return await this.profileService.updateProfile(requestBody);
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw error;
    }
  }

  // update tutor
  @Patch('updateTutor')
  async updateTutor(@Body() updateInfo: any) {
    try {
      return await this.tutorsService.createOrUpdateTutor(
        updateInfo.information,
      );
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw error;
    }
  }

  // update student
  @Patch('updateStudent')
  async updateStudent(@Body() requestBody) {
    try {
      const result = await this.studentsService.updateStudent(requestBody);
      return { result };
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw error;
    }
  }

  // toggle student status
  @Patch('updateCaseStatus')
  async updateCaseStatus(@Body() body: { studentId: string; status: string }) {
    try {
      return await this.historyService.updateCaseStatus(
        body.studentId,
        body.status,
      );
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw error;
    }
  }

  // toggle check status
  @Patch('updateTutorStatus')
  async updateTutorStatus(@Body() body: { tutorId: string; status: string }) {
    try {
      return await this.historyService.updateTutorStatus(
        body.tutorId,
        body.status,
      );
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw error;
    }
  }
}
