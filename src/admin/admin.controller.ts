import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
   constructor(private authService: AuthService) {}

  @Post('seed')
  async seedAdmin(
    @Body() body: { email: string; password: string },
  ) {
    // Prevent seeding in production
    if (process.env.NODE_ENV === 'production') {
      throw new ForbiddenException('Admin seeding disabled in production');
    }

    return this.authService.registerAdmin(body.email, body.password);
  }
}
