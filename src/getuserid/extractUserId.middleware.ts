import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
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
        req.body.userId = decoded.id; // Attach the userid to the request object
      } catch (error) {
        // Log the token verification error
        this.logger.error(`Error in ExtractUserIdMiddleware: ${error.message}`);

        // Handle token verification error as needed
        // You may want to log or handle this error differently

        // Optionally, you can throw an error or respond with an unauthorized status code
        // throw new UnauthorizedException('Invalid token');
        // res.status(401).json({ message: 'Unauthorized' });
      }
    }

    next();
  }
}
