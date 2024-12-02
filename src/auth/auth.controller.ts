import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Response } from 'express'; // Ensure this is imported from 'express'
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { accessToken, user } = await this.authService.login(
      body.email,
      body.password,
    );

    return { accessToken, user };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard) // Protect the logout route
  async logout(@Res({ passthrough: true }) response: Response) {
    // Clear the JWT cookie
    response.clearCookie('jwt', {
      httpOnly: true, // Ensure the cookie is cleared securely
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    });

    return { message: 'Logout successful' }; // Optionally return a success message
  }
}
