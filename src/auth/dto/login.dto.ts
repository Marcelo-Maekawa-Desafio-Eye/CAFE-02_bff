import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {

  @ApiProperty({ example: 'user@example.com', description: 'Email do Usuário' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '*********', description: 'Senha' })
  @IsString()
  @IsNotEmpty()
  password: string;
}