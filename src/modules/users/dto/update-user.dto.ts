import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDate,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
