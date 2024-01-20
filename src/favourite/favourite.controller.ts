import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { Logger } from '@nestjs/common'; // Import Logger

@Controller('favourite')
@UseGuards(JwtAuthGuard)
export class FavouriteController {
  private readonly logger = new Logger(FavouriteController.name); // Create a logger instance

  constructor(private readonly favouriteService: FavouriteService) {}

  @Get('tutors/:userId')
  async getUserTutor(@Request() req) {
    try {
      const authenticateduserId = req.userId;
      // Use authenticateduserId as needed
      return this.favouriteService.getFavouriteTutor(
        parseInt(authenticateduserId),
      );
    } catch (error) {
      this.logger.error(`Error in getUserTutor: ${error.message}`);
      throw new HttpException(
        `取得使用者導師時出錯`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('students/:userId')
  async getUserCases(@Request() req) {
    try {
      const authenticateduserId = req.userId;
      // Use authenticateduserId as needed
      return this.favouriteService.getFavouriterCase(
        parseInt(authenticateduserId),
      );
    } catch (error) {
      this.logger.error(`Error in getUserCases: ${error.message}`);
      throw new HttpException(
        `取得使用者案例時出錯`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('addStudent')
  async addFavouriteStudent(
    @Body() body: { userId: number; studentId: number },
  ) {
    try {
      return this.favouriteService.addFavouriteStudent(
        body.userId,
        body.studentId,
      );
    } catch (error) {
      this.logger.error(`Error in addFavouriteStudent: ${error.message}`);
      throw new HttpException(
        `加入最喜歡的學生時出錯`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('removeStudent')
  async removeFavouriteStudent(
    @Body() body: { userId: number; studentId: number },
  ) {
    try {
      return this.favouriteService.removeFavouriteStudent(
        body.userId,
        body.studentId,
      );
    } catch (error) {
      this.logger.error(`Error in removeFavouriteStudent: ${error.message}`);
      throw new HttpException(
        `刪除最喜歡的學生時出錯`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('addTutor')
  async addFavouriteTutor(@Body() body: { userId: number; tutorId: number }) {
    try {
      return this.favouriteService.addFavouriteTutor(body.userId, body.tutorId);
    } catch (error) {
      this.logger.error(`Error in addFavouriteTutor: ${error.message}`);
      throw new HttpException(
        `新增收藏導師時發生錯誤：`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('removeTutor')
  async removeFavouriteTutor(
    @Body() body: { userId: number; tutorId: number },
  ) {
    try {
      return this.favouriteService.removeFavouriteTutor(
        body.userId,
        body.tutorId,
      );
    } catch (error) {
      this.logger.error(`Error in removeFavouriteTutor: ${error.message}`);
      throw new HttpException(
        `刪除最愛導師時出錯`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
