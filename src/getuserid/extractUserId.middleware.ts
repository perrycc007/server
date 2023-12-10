import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ExtractUserIdMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming JWT token is in the 'Authorization' header

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req.body.userId = decoded.id; // Attach the userid to the request object
      } catch (error) {
        // Handle token verification error
        // You may want to log or handle this error differently
      }
    }

    next();
  }
}
