import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';
import { Logger } from '@nestjs/common';

@Controller('match')
export class MatchController {
  private readonly logger = new Logger(MatchController.name); // Create a logger instance

  constructor(private readonly matchService: MatchService) {}

  @Post('tutor')
  async matchTutor(@Body() requestBody) {
    try {
      return this.matchService.matchTutor(requestBody);
    } catch (error) {
      this.logger.error(`Error in matchTutor: ${error.message}`);
      throw error;
    }
  }

  @Post('student')
  async matchStudent(@Body() requestBody) {
    try {
      return this.matchService.matchStudent(requestBody);
    } catch (error) {
      this.logger.error(`Error in matchStudent: ${error.message}`);
      throw error;
    }
  }
}
