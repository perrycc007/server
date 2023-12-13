import {
  Injectable,
  NestMiddleware,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ExtractUserIdMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ExtractUserIdMiddleware.name); // Create a logger instance

  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming JWT token is in the 'Authorization' header

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req.body.userId = decoded.id; // Attach the user ID to the request object
        next();
      } catch (error) {
        // this.logger.error(`Error in ExtractUserIdMiddleware: ${error.message}`);
        // // Respond with an unauthorized status code
        // throw new UnauthorizedException('Invalid token');
      }
    } else {
      next();
    }
  }
}
