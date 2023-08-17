import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './db/user.entity';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { UserController } from './controller/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
