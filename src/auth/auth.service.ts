// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // Import bcrypt

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<string> {
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

    const accessToken = this.generateAccessToken({ id: user.userid, email: user.email });
    return accessToken;
  }

  private generateAccessToken(payload: { id: number; email: string }): string {
    return this.jwtService.sign(payload);
  }
}
