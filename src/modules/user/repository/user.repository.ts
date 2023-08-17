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

  async findUserByEmailWithPassword(email: string): Promise<User | null> {
    try {
      return await this.findOne({
        where: { email },
        select: { email: true, password: true, id: true },
      });
    } catch (err) {
      this.logger.error(`Error getting user by email: ${err}`);
      throw new ServiceUnavailableException();
    }
  }
  async findUserByIdWithTickets(id: string): Promise<User | null> {
    try {
      return await this.findOne({
        where: { id },
        relations: ['created_tickets'],
      });
    } catch (err) {
      this.logger.error(`Error getting user by Id: ${err}`);
      throw new ServiceUnavailableException();
    }
  }

  async findCurrentUser(email: string): Promise<User> {
    try {
      return await this.findOne({
        where: { email },
        select: {
          password: true,
          email: true,
          id: true,
          name: true,
          updated_at: true,
          created_at: true,
        },
      });
    } catch (err) {
      this.logger.error(`Error getting user ${email}`, err);
      throw new ServiceUnavailableException();
    }
  }
}
