import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard'; // Import the JwtAuthGuard
// @UseGuards(JwtAuthGuard)
@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  // @Get(':page')
  // async getResultByPage(@Param('page') page: string) {
  //   console.log(page);
  //   const parsedPage = JSON.parse(page);
  //   return this.resultService.getResultByPage(parsedPage);
  // }

  @Get('studentid/:studentid')
  async getResultByStudentId(
    @Param('studentid') studentid: string,
    @Query('page') page: string,
  ) {
    const parsedStudentId = JSON.parse(studentid);
    const parsedPage = JSON.parse(page);
    return this.resultService.getResultByStudentId(parsedStudentId, parsedPage);
  }
  @Get('tutorid/:tutorid')
  async getResultByTutorId(
    @Param('tutorid') tutorid: string,
    @Query('page') page: string,
  ) {
    const parsedTutorId = JSON.parse(tutorid);
    const parsedPage = JSON.parse(page);
    return this.resultService.getResultByStudentId(parsedTutorId, parsedPage);
  }
  @Get('studentidSorted')
  async getSortedStudentid() {
    return this.resultService.getSortedStudentid();
  }
  @Get('tutoridSorted')
  async getSortedTutortid() {
    return this.resultService.getSortedTutortid();
  }
}
