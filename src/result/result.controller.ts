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
  @Get('tutorId/:tutorId')
  async getResultBytutorId(
    @Param('tutorId') tutorId: string,
    @Query('page') page: string,
  ) {
    const parsedtutorId = JSON.parse(tutorId);
    const parsedPage = JSON.parse(page);
    return this.resultService.getResultByStudentId(parsedtutorId, parsedPage);
  }
  @Get('studentidSorted')
  async getSortedStudentid() {
    return this.resultService.getSortedStudentId();
  }
  @Get('tutorIdSorted')
  async getSortedTutortid() {
    return this.resultService.getSortedTutortid();
  }
}
