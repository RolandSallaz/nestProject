import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByName(userDto.name);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким именем уже зарегистрирован',
        HttpStatus.CONFLICT,
      );
    }
    const password = await bcrypt.hash(userDto.password, 10);
    const user = await this.userService.create({ ...userDto, password });
    return this.generateToken(user);
  }

  private async generateToken({ name, id }: User) {
    const payload = { name, id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByName(userDto.name);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Некорректный емейл или пароль',
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный емейл или пароль',
    });
  }
}
