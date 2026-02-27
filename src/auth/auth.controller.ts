import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  // "email": "Madmin@gmail.com",
  // "password": "M123"
register(@Body() body: { email: string; password: string }) {
  return this.authService.registerAdmin(body.email, body.password);
}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.validateAdmin(body.email, body.password);
  }
}
