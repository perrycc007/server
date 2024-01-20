import {
  Controller,
  Patch,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard'; // Import the JwtAuthGuard
import { MatchService } from '../match/match.service';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly matchService: MatchService,
  ) {}
  // @Get('test')
  // async test() {
  //   return this.studentsService.test();
  // }

  @Get()
  async findManyWithStatusOpen() {
    // Implement logic to fetch students based on query parameters
    try {
      return this.studentsService.findManyWithStatusOpen();
    } catch (error) {
      const result = {
        data: {
          error: true,
        },
      };
      return result;
    }
  }

  @Get('withFavourite')
  async findAllWithFavourite(@Body() requestBody: any) {
    try {
      // Implement logic to fetch students based on query parameters
      return this.studentsService.findManyWithStatusOpenWithFavourite(
        requestBody.userId,
      );
    } catch (error) {
      throw new HttpException(
        '未能找到所有學生',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('getFavouriteCase/:userid')
  async getFavouriteCases(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return this.studentsService.findUniqueUserFavouriteCases(userId);
    } catch (error) {
      throw new HttpException(
        '未能取得收藏案例',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':studentId')
  async findOne(@Param('studentId') studentId: string) {
    try {
      // Implement logic to fetch a student by ID
      return this.studentsService.getStudentbyStudentId(studentId);
    } catch (error) {
      throw new HttpException(
        `找不到學生${studentId}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateStudent(@Body() requestBody) {
    try {
      const result = await this.studentsService.updateStudent(requestBody);

      if (this.studentsService.isFormComplete(requestBody)) {
        await this.matchService.matchStudent(requestBody);
      }
      return { result };
    } catch (error) {
      throw new HttpException('更新學生失敗', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Patch('updateCaseStatus')
  async updateCaseStatus(@Body() requestBody) {
    try {
      const result = await this.studentsService.updateCaseStatus(requestBody);
      return { result };
    } catch (error) {
      throw new HttpException('更新學生失敗', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() requestBody) {
    try {
      const result = await this.studentsService.createStudent(requestBody);
      if (this.studentsService.isFormComplete(requestBody)) {
        await this.matchService.matchStudent(requestBody);
      }
      return { result };
    } catch (error) {
      throw new HttpException('創建學生失敗', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('filter')
  async findStudentByPreference(@Body() requestBody: any) {
    console.log(requestBody);
    try {
      const { lowestfee, locations, highestfee, subjects } =
        requestBody.preference;
      return await this.studentsService.findStudentByPreference(
        lowestfee,
        locations,
        subjects,
      );
    } catch (error) {
      throw new HttpException(
        '未能按喜好找到學生',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('filterWithFavourite')
  async findTutorsByPreferencesWithFavourite(@Body() requestBody: any) {
    try {
      const { lowestfee, locations, highestfee, subjects } =
        requestBody.preference;
      return await this.studentsService.findStudentByPreferenceWithFavourite(
        lowestfee,
        locations,
        subjects,
        requestBody.userId,
      );
    } catch (error) {
      throw new HttpException(
        '未能按喜好找到學生',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
