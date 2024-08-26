import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExists) {
      throw new ConflictException('User already registered');
    }

    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      bcrypt.genSaltSync(10),
    );

    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email) {
      const userWithSameEmail = await this.prismaService.user.findUnique({
        where: {
          email: updateUserDto.email,
        },
      });

      if (
        userWithSameEmail &&
        userWithSameEmail.email === updateUserDto.email
      ) {
        throw new ConflictException('E-mail already registered');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        bcrypt.genSaltSync(10),
      );
    }

    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<object> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await await this.prismaService.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully', status: 204 };
  }
}
