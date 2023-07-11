import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { MinLength, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентифкатор' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'user', description: 'Никнейм пользователя' })
  @Column({ unique: true })
  @Length(2, 32)
  name: string;
  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Column()
  @MinLength(8)
  password: string;
  @ApiProperty({
    example: '2023-07-11T16:06:19.427Z',
    description: 'Время регистрации',
  })
  @CreateDateColumn()
  registerDate: Date;
}
