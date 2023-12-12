import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Logger } from '@nestjs/common'; // Import Logger

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name); // Create a logger instance

  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      console.log('signUpDto');
      const accessToken = await this.authService.signUp(signUpDto);
      return { ...accessToken };
    } catch (error) {
      // Log the error
      this.logger.error(`Error during signup: ${error.message}`);

      // Throw an HttpException with a specific status code and error message
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    try {
      const accessToken = await this.authService.authenticateUser(
        email,
        password,
      );
      return { ...accessToken };
    } catch (error) {
      // Log the error
      this.logger.error(`Error during login: ${error.message}`);

      // Throw an HttpException with a specific status code and error message
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
