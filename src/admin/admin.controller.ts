import {
  Controller,
  Patch,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAdminGuard } from '../auth/guard/admin.guard';
import { StudentsService } from '../students/students.service';
import { TutorsService } from '../tutors/tutors.service';
import { HistoryService } from '../history/history.service';
import { ProfileService } from '../profile/profile.service';
import { MatchService } from '../match/match.service';
@Controller('admin')
@UseGuards(JwtAdminGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly tutorsService: TutorsService,
    private readonly studentsService: StudentsService,
    private readonly historyService: HistoryService,
    private readonly profileService: ProfileService,
    private readonly matchService: MatchService,
  ) {}

  @Patch('toggleCheck')
  async toggleCheck(@Body() requestBody) {
    try {
      return await this.adminService.toggleCheck(requestBody);
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw new HttpException(
        '更新導師時出錯',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('toggleAvail')
  async toggleAvail(@Body() requestBody) {
    try {
      return await this.adminService.toggleAvail(requestBody);
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw new HttpException(
        '更新學生時出錯',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('updateTutorVerify')
  async updateTutorVerify(@Body() requestBody) {
    try {
      return await this.adminService.updateTutorVerify(requestBody);
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw new HttpException(
        '更新案例狀態時發生錯誤',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Patch('profile')
  async updateProfile(@Body() requestBody) {
    try {
      return await this.profileService.updateProfile(requestBody);
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw new HttpException(
        '更新個人檔案時發生錯誤',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // update tutor
  @Patch('updateTutor')
  async updateTutor(@Body() updateInfo: any) {
    try {
      const result = await this.tutorsService.createOrUpdateTutor(
        updateInfo.information,
      );
      if (this.tutorsService.isFormComplete(updateInfo.information)) {
        await this.matchService.matchStudent(updateInfo.information);
      }
      return { result };
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw new HttpException(
        '更新導師時出錯',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // update student
  @Patch('updateStudent')
  async updateStudent(@Body() requestBody) {
    try {
      const result = await this.studentsService.updateStudent(requestBody);

      if (this.studentsService.isFormComplete(requestBody)) {
        await this.matchService.matchStudent(requestBody);
      }
      return { result };
    } catch (error) {
      // Handle the error and send an appropriate response or rethrow if needed.
      throw new HttpException(
        '更新學生時出錯',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      throw new HttpException(
        '更新案例狀態時發生錯誤',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      throw new HttpException(
        '更新導師狀態時發生錯誤',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
