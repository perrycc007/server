import { Controller, Get, Param } from '@nestjs/common';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get(':page')
  async getResultByPage(@Param('page') page: string) {
    const parsedPage = JSON.parse(page);
    return this.resultService.getResultByPage(parsedPage);
  }

  @Get('studentid/:studentid')
  async getResultByStudentId(@Param('studentid') studentid: string) {
    const parsedStudentId = JSON.parse(studentid);
    return this.resultService.getResultByStudentId(parsedStudentId);
  }
}
