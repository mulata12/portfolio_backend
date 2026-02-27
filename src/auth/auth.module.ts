import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Admin } from './admin.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { AdminGuard } from './admin.guard';


@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,AdminGuard],
   exports: [AuthService, AdminGuard, JwtModule],
})
export class AuthModule {}
