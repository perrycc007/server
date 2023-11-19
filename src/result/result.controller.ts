import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get(':page')
  async getResultByPage(@Param('page') page: string) {
    console.log(page);
    const parsedPage = JSON.parse(page);
    return this.resultService.getResultByPage(parsedPage);
  }

  @Get('studentid/:studentid')
  async getResultByStudentId(
    @Param('studentid') studentid: string,
    @Query('page') page: string,
  ) {
    const parsedStudentId = JSON.parse(studentid);
    const parsedPage = JSON.parse(page);
    return this.resultService.getResultByStudentId(parsedStudentId, parsedPage);
  }

  @Get(`studentidSorted`)
  async getSortedStudentid() {
    return this.resultService.getSortedStudentid();
  }
  @Get(`tutoridSorted`)
  async getSortedTutortid() {
    return this.resultService.getSortedTutortid();
  }
}
