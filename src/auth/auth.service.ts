const newrelic = require('newrelic');
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<any> {
    try {
      const { email, password } = signUpDto;
      const saltRounds = 8;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      if (!user) {
        throw new Error('User registration failed');
      }

      const accessToken = this.generateAccessToken({
        id: user.userId,
        email: user.email,
      });
      return { accessToken: accessToken, userId: user.userId };
    } catch (error) {
      this.logger.error(`Error during sign-up: ${error.message}`);
      throw error;
    }
  }

  async authenticateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error('Invalid email or password');
      }

      // Generate an access token
      const accessToken = this.generateAccessToken({
        id: user.userId,
        email: user.email,
      });
      return { accessToken: accessToken, userId: user.userId };
    } catch (error) {
      this.logger.error(`Error during authentication: ${error.message}`);
      throw error;
    }
  }

  private generateAccessToken(payload: { id: number; email: string }): string {
    return this.jwtService.sign(payload);
  }
}
