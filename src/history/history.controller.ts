import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get(':userid')
  async getHistoryByUserId(@Param('userid') userid: string) {
    return this.historyService.getHistoryByUserId(userid);
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
