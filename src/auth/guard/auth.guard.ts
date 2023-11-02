import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    console.log(request, token)
    if (!token) {
      throw new UnauthorizedException('You must be authenticated.');
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      request.user = decodedToken;
      console.log(decodedToken)
      // Perform additional actions here, e.g., updating the profile
      await this.updateProfile(request.user);

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token.');
    }
  }

  private extractToken(request): string {
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const parts = authHeader.split(' ');
      if (parts.length === 2) {
        const scheme = parts[0];
        const token = parts[1];
        if (/^Bearer$/i.test(scheme)) {
          return token;
        }
      }
    }
    return null;
  }

  private async updateProfile(user): Promise<void> {
    const date_ob = new Date();

    try {
      await this.prisma.profile.updateMany({
        where: {
          userid: user.id, // Assuming 'user.id' contains the correct user ID
        },
        data: {
          lastOnline: date_ob,
        },
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new UnauthorizedException('Profile update failed.');
    }
  }
}
