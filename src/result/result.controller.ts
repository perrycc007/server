import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { JwtAdminGuard } from '../auth/guard/admin.guard'; // Import the JwtAuthGuard
// @UseGuards(JwtAuthGuard)
@Controller('result')
@UseGuards(JwtAdminGuard)
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
    try {
      const parsedStudentId = JSON.parse(studentid);
      const parsedPage = JSON.parse(page);
      return await this.resultService.getResultByStudentId(
        parsedStudentId,
        parsedPage,
      );
    } catch (error) {
      throw new HttpException(
        '無法透過學生ID取得結果',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('tutorId/:tutorId')
  async getResultBytutorId(
    @Param('tutorId') tutorId: string,
    @Query('page') page: string,
  ) {
    try {
      const parsedtutorId = JSON.parse(tutorId);
      const parsedPage = JSON.parse(page);
      return this.resultService.getResultByStudentId(parsedtutorId, parsedPage);
    } catch (error) {
      throw new HttpException(
        '無法透過導師ID取得結果',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('studentidSorted')
  async getSortedStudentid() {
    try {
      return this.resultService.getSortedStudentId();
    } catch (error) {
      throw new HttpException(
        '無法取得已排序的學生 ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('tutorIdSorted')
  async getSortedTutortid() {
    try {
      return this.resultService.getSortedTutortid();
    } catch (error) {
      throw new HttpException(
        '無法取得已排序的導師 ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
