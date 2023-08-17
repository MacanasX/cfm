import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import authConfig from '../../../config/auth.config';
import { ConfigType } from '@nestjs/config';
import * as Jwt from 'jsonwebtoken';
import { User } from '../../user/db/user.entity';
import { UserRepository } from '../../user/repository/user.repository';
import { verify } from 'argon2';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly userRepository: UserRepository,
  ) {
    this.validateConfig();
    this.logger.log('AuthService initialized');
  }

  validateConfig() {
    if (!this.config.secret) {
      throw new Error('Authentication secret is not set');
    }
    if (this.config.access.method === '') {
      throw new Error('Access token method is not set');
    }
    if (this.config.access.expiresIn === '') {
      throw new Error('Access token expiration is not set');
    }
    if (this.config.refresh.method === '') {
      throw new Error('Refresh token method is not set');
    }
    if (this.config.refresh.expiresIn === '') {
      throw new Error('Refresh token expiration is not set');
    }
    if (this.config.access.method === this.config.refresh.method) {
      throw new Error('Access and refresh token methods must be different');
    }
  }

  public async loginUser(email: string, password: string) {
    const user = await this.userRepository.findUserByEmailWithPassword(email);
    if (user === null) throw new NotFoundException();

    const isValid: boolean = await this.verifyLogin(user, password);

    if (!isValid) throw new UnauthorizedException();

    return {
      accessToken: this.signToken(user, this.config.access),
      refreshToken: this.signToken(user, this.config.refresh),
    };
  }
  public async refresh(refreshToken: string) {
    const payload = this.verifyToken(refreshToken);
    this.verifyMethod(payload, this.config.refresh.method);
    const user = await this.userRepository.findUserForAuth(payload.userId);
    if (user === null) throw new NotFoundException('User not found');

    this.verifyTokenVersion(payload, user);

    return { refreshToken: this.signToken(user, this.config.refresh) };
  }

  async verifyLogin(user: User, password: string): Promise<boolean> {
    try {
      return await verify(user.password, password);
    } catch (err) {
      this.logger.error(
        `Could not verify password for the user ${user.id}`,
        err,
      );
      return false;
    }
  }

  private signToken(
    user: User,
    { method, expiresIn }: { method: string; expiresIn: string },
  ): string {
    const payload = {
      userId: user.id,
      userEmail: user.email,
      method,
      tokenVersion: user.tokenVersion,
    };
    return Jwt.sign(payload, this.config.secret, { expiresIn });
  }

  public async verifyAccessToken(token: string): Promise<JwtPayload> {
    const payload = this.verifyToken(token);
    this.verifyMethod(payload, this.config.access.method);
    return payload;
  }

  verifyToken(token: string): JwtPayload {
    try {
      return Jwt.verify(token, this.config.secret) as JwtPayload;
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException();
    }
  }
  verifyMethod(payload: JwtPayload, method: string): void {
    if (payload.method !== method) {
      this.logger.error(`Invalid Token method: ${payload.method}`);
      throw new UnauthorizedException();
    }
  }
  verifyTokenVersion(payload: JwtPayload, user: User) {
    if (payload.version !== user.tokenVersion) {
      this.logger.error('Invalid token version');
      throw new UnauthorizedException();
    }
  }
}
