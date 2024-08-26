import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('jwt', token.access_token, { httpOnly: true });
    return { message: 'Login successful' };
  }

  @Post('register')
  async register(
    @Body() registerDto: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.register(registerDto);
    const token = await this.authService.login(user);
    res.cookie('jwt', token.access_token, { httpOnly: true });
    return { message: 'Registration successful' };
  }
}
