import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { Logger } from '@nestjs/common';

@Controller('history')
@UseGuards(JwtAuthGuard)
export class HistoryController {
  private readonly logger = new Logger(HistoryController.name); // Create a logger instance

  constructor(private readonly historyService: HistoryService) {}

  @Get(':userId')
  async getHistoryByuserId(@Param('userId') userId: string) {
    try {
      return this.historyService.getHistoryByUserId(userId);
    } catch (error) {
      this.logger.error(`Error in getHistoryByuserId: ${error.message}`);
      throw error;
    }
  }

  @Patch('updateCaseStatus')
  async updateCaseStatus(@Body() body: { studentId: string; status: string }) {
    try {
      return this.historyService.updateCaseStatus(body.studentId, body.status);
    } catch (error) {
      this.logger.error(`Error in updateCaseStatus: ${error.message}`);
      throw error;
    }
  }

  @Patch('updateTutorStatus')
  async updateTutorStatus(@Body() body: { tutorId: string; status: string }) {
    try {
      return this.historyService.updateTutorStatus(body.tutorId, body.status);
    } catch (error) {
      this.logger.error(`Error in updateTutorStatus: ${error.message}`);
      throw error;
    }
  }
}
