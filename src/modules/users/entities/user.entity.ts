import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDate,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class User {
  @IsOptional()
  @IsString()
  id: string;

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
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
