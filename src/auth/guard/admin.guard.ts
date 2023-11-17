import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtAdminGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('You must be authenticated.');
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      const userid = decodedToken.id; // Extract the user ID from the decoded token
      // Pass the userId to the controller by setting it on the request object
      request.userid = userid;
      // Perform additional actions here, e.g., updating the profile
      const role = await this.checkRole(parseInt(userid));
      if (role.data == 'admin') {
        return true;
      } else {
        throw new UnauthorizedException('You must be admin.');
      }

      // Return true to indicate that the user is authenticated
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

  private async checkRole(userId: number): Promise<any> {
    try {
      const result = await this.prisma.user.findUnique({
        where: {
          userid: userId, // Use the extracted user ID
        },
        select: {
          role: true,
        },
      });
      return result;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new UnauthorizedException('Profile update failed.');
    }
  }
}
