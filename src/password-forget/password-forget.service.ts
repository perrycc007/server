import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordForgetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async sendResetLink(email: string) {
    try {
      console.log(email);
      const user = await this.prisma.user.findFirst({ where: { email } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const secret = process.env.RESET_PASSWORD_SECRET + user.password;
      const payload = { email: email, userId: user.userId };
      const token = this.jwt.sign(payload, { secret, expiresIn: '15m' });
      const link = `http://localhost:3000/resetPassword/${user.userId}/${token}`;

      // Logic to send email with the reset link
      // sendResetPasswordEmail(email, link)
      console.log(link); // Replace with actual email sending logic

      return 'Reset link sent';
    } catch (error) {
      throw new HttpException(
        'Failed to send reset link',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyToken(userId: string, token: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { userId: parseInt(userId) },
      });
      if (!user) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }

      const secret = process.env.RESET_PASSWORD_SECRET + user.password;
      return this.jwt.verify(token, { secret });
    } catch (error) {
      throw new HttpException(
        'Token verification failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPassword(userId: string, token: string, newPassword: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { userId: parseInt(userId) },
      });

      if (!user) {
        throw new HttpException("User doesn't exist", HttpStatus.UNAUTHORIZED);
      }

      const secret = process.env.RESET_PASSWORD_SECRET + user.password;
      const payload = this.jwt.verify(token, { secret });
      if (userId !== payload.userId.toString()) {
        throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
      }
      const salt = await bcrypt.genSalt(8);
      const encryptedPassword = await bcrypt.hash(newPassword, salt);
      // console.log(encryptedPassword);
      return await this.prisma.user.update({
        where: { userId: parseInt(userId) },
        data: { password: encryptedPassword },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
