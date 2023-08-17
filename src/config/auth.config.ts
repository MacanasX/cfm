import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('auth', () => ({
  secret: process.env.AUTH_SECRET ?? '',
  access: {
    method: process.env.AUTH_ACCESS_METHOD ?? '',
    expiresIn: process.env.AUTH_ACCESS_EXPIRES_IN ?? '',
  },
  refresh: {
    method: process.env.AUTH_REFRESH_METHOD ?? '',
    expiresIn: process.env.AUTH_REFRESH_EXPIRES_IN ?? '',
  },
}));
