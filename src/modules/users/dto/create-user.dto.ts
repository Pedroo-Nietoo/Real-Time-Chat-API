import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  id: string;

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
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
