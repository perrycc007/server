import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('cases')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async findAll(@Query() query) {
    // Implement logic to fetch students based on query parameters
    return this.studentsService.findAll(query);
  }

  @Get(':casesid')
  async findOne(@Param('casesid') casesid: string) {
    // Implement logic to fetch a student by ID
    return this.studentsService.findOne(casesid);
  }

  @Post()
  async create(@Body() requestBody) {
    // Implement logic to create a student
    return this.studentsService.create(requestBody);
  }
}
