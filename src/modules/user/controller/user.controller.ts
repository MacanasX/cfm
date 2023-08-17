import { UserService } from '../service/user.service';
import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create() {}
}
