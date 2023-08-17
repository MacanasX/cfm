import { Inject, Logger } from '@nestjs/common';
import authConfig from '../../../config/auth.config';
import { ConfigType } from '@nestjs/config';

export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
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
    if (this.config.access.expiresIn) {
      throw new Error('Access token expiration is not set');
    }
    if (this.config.refresh.method) {
      throw new Error('Refresh token method is not set');
    }
    if (this.config.refresh.expiresIn === '') {
      throw new Error('Refresh token expiration is not set');
    }
    if (this.config.access.method === this.config.refresh.method) {
      throw new Error('Access and refresh token methods must be different');
    }
  }
}
