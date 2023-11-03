import {
  Controller,
  Patch,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async findAll() {
    // Implement logic to fetch students based on query parameters
    return this.studentsService.findManyWithStatusOpen();
  }

  @Post('getFavouriteCase/:userid')
  async getFavouriteCases(@Param('userid', ParseIntPipe) userId: number) {
    return this.studentsService.findUniqueUserFavouriteCases(userId);
  }

  @Get(':casesid')
  async findOne(@Param('casesid') casesid: string) {
    // Implement logic to fetch a student by ID
    return this.studentsService.findOne(casesid);
  }
  @Patch()
  async updateStudent(
    @Body('studentid', ParseIntPipe) studentid: number,
    @Body('information') information: any,
  ) {
    const result = await this.studentsService.updateStudent(
      studentid,
      information,
    );
    return { result };
  }

  @Post()
  async create(@Body() requestBody) {
    // Implement logic to create a student
    return this.studentsService.create(requestBody);
  }
}
