import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../db/user.entity';
import { hash } from 'argon2';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: CreateUserDto): Promise<void> {
    const user: User = this.userRepository.create();

    user.name = dto.name;
    user.email = dto.email;
    user.password = await hash(dto.password);

    await this.userRepository.saveUser(user);
  }

  async getUserByEmailWithPassword(email: string): Promise<User> {
    const user = await this.userRepository.findUserByEmailWithPassword(email);
    if (!user) throw new ServiceUnavailableException();
    return user;
  }
}
