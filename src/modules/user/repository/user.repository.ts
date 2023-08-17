import { DataSource, Repository } from 'typeorm';
import { User } from '../db/user.entity';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger(UserRepository.name);

  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
