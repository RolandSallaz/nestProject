import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { MinLength, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Length(2, 32)
  name: string;

  @Column()
  @MinLength(8)
  password: string;

  @CreateDateColumn()
  registerDate: Date;
}
