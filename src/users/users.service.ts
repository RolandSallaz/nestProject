import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
