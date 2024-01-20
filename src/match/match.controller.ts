import {
  Controller,
  Post,
  Body,
  Logger,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  private readonly logger = new Logger(MatchController.name);

  constructor(private readonly matchService: MatchService) {}

  @Post('tutor')
  async matchTutor(@Body() requestBody) {
    try {
      return await this.matchService.matchTutor(requestBody);
    } catch (error) {
      this.logger.error(`Error in matchTutor: ${error.message}`);
      // Here, you can throw a specific exception based on the error type
      throw new HttpException(`匹配導師錯誤`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('student')
  async matchStudent(@Body() requestBody) {
    try {
      return await this.matchService.matchStudent(requestBody);
    } catch (error) {
      this.logger.error(`Error in matchStudent: ${error.message}`);
      // Here, you can throw a specific exception based on the error type
      throw new HttpException(
        `配對學生時出錯`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
