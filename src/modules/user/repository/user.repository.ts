import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { User } from '../db/user.entity';
import {
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger(UserRepository.name);

  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async saveUser(user: User): Promise<User> {
    try {
      return await this.save(user);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        this.logger.error(`Error saving user: ${err}`);
        throw new ConflictException('User already exists');
      }
      this.logger.error(`Error saving user: ${err}`);
      throw new ServiceUnavailableException();
    }
  }
}
