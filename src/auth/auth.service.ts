import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async registerAdmin(email: string, password: string) {
  const existing = await this.adminRepo.findOne({ where: { email } });
  if (existing) {
    throw new UnauthorizedException('Admin already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = this.adminRepo.create({
    email,
    password: hashedPassword,
  });

  await this.adminRepo.save(admin);

  return { message: 'Admin created successfully' };
}

  
  async validateAdmin(email: string, password: string) {
    const admin = await this.adminRepo.findOne({ where: { email } });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, admin.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: admin.id, email: admin.email, role: 'ADMIN' };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
