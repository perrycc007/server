import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import {JwtAuthGuard} from '../auth/guard/auth.guard'


@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getHistoryByUserId(@Param('userid') userid: string) {
    // return this.historyService.getHistoryByUserId(userid);
    return "dddd"
  }

  @Patch('updateCaseStatus')
  async updateCaseStatus(@Body() body: { studentid: string; status: string }) {
    return this.historyService.updateCaseStatus(body.studentid, body.status);
  }

  @Patch('updateTutorStatus')
  async updateTutorStatus(@Body() body: { tutorid: string; status: string }) {
    return this.historyService.updateTutorStatus(body.tutorid, body.status);
  }
}
