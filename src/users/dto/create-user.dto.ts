import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user', description: 'Никнейм пользователя' })
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @MinLength(2, { message: 'Длина имени должна быть больше 2 символов' })
  readonly name: string;
  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(8, { message: 'Длина пароля должна быть больше 8 символов' })
  readonly password: string;
}
