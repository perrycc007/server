import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  // @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getHistoryByuserId(@Param('userId') userId: string) {
    return this.historyService.getHistoryByUserId(userId);
  }

  @Patch('updateCaseStatus')
  async updateCaseStatus(@Body() body: { studentId: string; status: string }) {
    return this.historyService.updateCaseStatus(body.studentId, body.status);
  }

  @Patch('updateTutorStatus')
  async updateTutorStatus(@Body() body: { tutorId: string; status: string }) {
    return this.historyService.updateTutorStatus(body.tutorId, body.status);
  }
}
