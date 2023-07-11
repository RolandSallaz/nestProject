import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.userRepository.save(dto);
  }

  async getUserByName(name: string): Promise<User> {
    return this.userRepository.findOne({ where: { name } });
  }
}
