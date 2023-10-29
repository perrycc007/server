import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetService {
  constructor(private readonly prismaService: PrismaService) {}

  async resetPassword(userid: string, newPassword: string) {
    const saltRounds = 8;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    try {
      const result = await this.prismaService.user.update({
        where: {
          userid: parseInt(userid),
        },
        data: {
          password: hashedPassword,
        },
      });
      return result;
    } catch (error) {
      console.error(error.message);
      throw new Error('Password update failed');
    }
  }
}
