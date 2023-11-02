// src/auth/auth.controller.ts
import { Controller, Get, Post, Body, HttpException, HttpStatus, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {

    try {
      console.log('signUpDto')
      const accessToken = await this.authService.signUp(signUpDto);
      return { accessToken };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    console.log(loginDto)
    const { email, password } = loginDto;
    const accessToken = await this.authService.authenticateUser(email, password);
    return { accessToken };
  }


}
