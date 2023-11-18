import {
  Controller,
  Patch,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Query,
  UseGuards,
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
    return this.studentsService.findManyWithStatusOpen();
  }

  @Post('getFavouriteCase/:userid')
  async getFavouriteCases(@Param('userid', ParseIntPipe) userId: number) {
    return this.studentsService.findUniqueUserFavouriteCases(userId);
  }

  @Get(':studentid')
  async findOne(@Param('studentid') studentid: string) {
    // Implement logic to fetch a student by ID
    return this.studentsService.getStudentbyStudentid(studentid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateStudent(@Body() requestBody) {
    const result = await this.studentsService.updateStudent(requestBody);
    return { result };
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() requestBody) {
    // Implement logic to create a student
    return this.studentsService.createStudent(requestBody);
  }

  @Post('filter')
  async findTutorsByPreferences(@Body() preferences: any) {
    const { fee, location, highestteachinglevel, subject } = preferences;
    const pref = {
      highestteachinglevel: highestteachinglevel,
      lowestfee: {
        gte: fee[0],
      },
      status: 'open',
    };
    if (fee[0] == null) {
      delete pref.lowestfee;
    }
    if (highestteachinglevel[0] == null) {
      delete pref.highestteachinglevel;
    }
    return this.studentsService.findStudentByPreference(
      pref,
      location,
      subject,
    );
  }
}
