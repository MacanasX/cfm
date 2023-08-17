import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  imports: [UserModule],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
