import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, NextFunction } from 'express';
import { AuthService } from '../service/auth.service';
import { MiddlewareResponse } from './auth.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  extractToken(req: Request): string {
    const authHeader = req.header('Authorization');

    if (!authHeader) throw new UnauthorizedException();

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer') throw new UnauthorizedException();

    return token;
  }
  async verify(token: string, res: MiddlewareResponse): Promise<void> {
    const payload = await this.authService.verifyAccessToken(token);
    res.locals.payload = payload;
    console.log('HERE');
    console.log(payload);
  }
  use(req: Request, res: MiddlewareResponse, next: NextFunction) {
    const token = this.extractToken(req);
    console.log(token);
    this.verify(token, res).then(next).catch(next);
  }
}
