import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { TutorService } from './tutors.service'; // Create the TutorService

@Controller('tutor')
export class TutorsController {
  constructor(private readonly tutorService: TutorService) {}

  @Get()
  async findAll(@Query() query) {
    const { completed, limit, skip, sortBy } = query;
    // Implement logic to fetch tutors based on query parameters
    return this.tutorService.findAll(completed, limit, skip, sortBy);
  }

  @Get(':userid')
  async findOne(@Param('userid') userid: number) {
    // Implement logic to fetch a tutor by ID
    return this.tutorService.findOne(userid);
  }

  @Post()
  async create(@Body() body) {
    // Implement logic to create a tutor
    return this.tutorService.create(body);
  }

  @Patch(':userid')
  async update(@Param('userid') userid: number, @Body() body) {
    // Implement logic to update a tutor by ID
    return this.tutorService.update(userid, body);
  }
}
