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

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // @Get('test')
  // async test() {
  //   return this.studentsService.test();
  // }

  @Get()
  async findAll() {
    // Implement logic to fetch students based on query parameters
    try {
      return this.studentsService.findManyWithStatusOpen();
    } catch (error) {
      throw new HttpException(
        'Failed to find all students',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
        'Failed to find all students with favourite',
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
        'Failed to get favourite cases',
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
        `Failed to find student with ID ${studentId}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateStudent(@Body() requestBody) {
    try {
      console.log(requestBody);
      const result = await this.studentsService.updateStudent(requestBody);
      return { result };
    } catch (error) {
      throw new HttpException(
        'Failed to update student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @UseGuards(JwtAuthGuard)
  @Patch('updateCaseStatus')
  async updateCaseStatus(@Body() requestBody) {
    try {
      console.log(requestBody);
      const result = await this.studentsService.updateCaseStatus(requestBody);
      return { result };
    } catch (error) {
      throw new HttpException(
        'Failed to update student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() requestBody) {
    try {
      return await this.studentsService.createStudent(requestBody);
    } catch (error) {
      throw new HttpException(
        'Failed to create student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('filter')
  async findTutorsByPreferences(@Body() requestBody: any) {
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
        'Failed to find students by preferences',
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
        'Failed to find students by preferences with favourite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
