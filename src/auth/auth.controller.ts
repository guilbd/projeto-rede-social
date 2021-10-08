import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { User } from '.prisma/client';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateAuthDto, AuthResponse } from './dto/create-auth.dto';
import AuthUser from 'src/common/decorators/auth-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  login(@Body() data: CreateAuthDto): Promise<AuthResponse> {
    return this.service.login(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@AuthUser() user: User): User {
    return user;
  }
}
