import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('database', () => ({
  port: +(process.env.DATABASE_PORT ?? 3306),
  host: process.env.DATABASE_HOST ?? '',
  username: process.env.DATABASE_USERNAME ?? '',
  password: process.env.DATABASE_PASSWORD ?? '',
  database: process.env.DATABASE_NAME ?? '',
  synchronize: process.env.DATABASE_SYNCHRONIZE?.toLowerCase() === 'true',
}));
