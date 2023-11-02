import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('tutor')
  async matchTutor(@Body() requestBody) {
    return this.matchService.matchTutor(requestBody);
  }

  @Post('student')
  async matchStudent(@Body() requestBody) {
    return this.matchService.matchStudent(requestBody);
  }
}
