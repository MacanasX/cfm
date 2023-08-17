import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { MiddlewareResponse } from '../middleware/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    return await this.authService.loginUser(dto.email, dto.password);
  }
  @Post('refresh')
  public async refresh(@Body() dto: RefreshTokenDto) {
    return await this.authService.refresh(dto.refreshToken);
  }
  @Post('logout')
  public async logout(@Res({ passthrough: true }) res: MiddlewareResponse) {
    await this.authService.logout(res.locals.payload);
  }
}
