import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtAdminGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAdminGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      this.logger.warn('No token found in request headers');
      throw new UnauthorizedException('Authentication token is missing.');
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      const userId = decodedToken.id;
      request.userId = userId;

      const userRole = await this.checkRole(parseInt(userId));
      if (userRole?.role !== 'ADMIN') {
        this.logger.warn(`Access denied for non-admin user with ID: ${userId}`);
        throw new UnauthorizedException('Only admin users are authorized.');
      }
      return true;
    } catch (error) {
      this.logger.error(
        'Error validating token or checking user role',
        error.stack,
      );
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }

  private extractToken(request): string {
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const parts = authHeader.split(' ');
      if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
        return parts[1];
      }
    }
    return null;
  }

  private async checkRole(userId: number): Promise<{ role: string } | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { userId },
        select: { role: true },
      });
    } catch (error) {
      this.logger.error(
        `Error fetching role for user with ID: ${userId}`,
        error.stack,
      );
      throw error; // Rethrow the error or handle it as needed
    }
  }
}
