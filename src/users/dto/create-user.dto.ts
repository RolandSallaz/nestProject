import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user', description: 'Никнейм пользователя' })
  readonly name: string;
  @ApiProperty({ example: '12345678', description: 'Пароль' })
  readonly password: string;
}
