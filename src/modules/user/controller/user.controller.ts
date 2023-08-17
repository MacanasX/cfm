import { UserService } from '../service/user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { MiddlewareResponse } from '../../auth/middleware/auth.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto): Promise<void> {
    await this.userService.createUser(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUserInformation(
    @Res({ passthrough: true }) res: MiddlewareResponse,
  ) {
    return this.userService.getAllUserInformations(
      res.locals.payload.userEmail,
    );
  }
}
