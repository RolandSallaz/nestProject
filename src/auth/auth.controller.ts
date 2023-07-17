import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { IToken } from 'src/types';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('login')
  async login(@Body() userDto: CreateUserDto): Promise<IToken> {
    return this.authService.login(userDto);
  }
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Post('register')
  @HttpCode(201)
  async register(@Body() userDto: CreateUserDto): Promise<IToken> {
    return this.authService.register(userDto);
  }
}
