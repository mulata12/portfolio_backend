import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { AdminGuard } from '../auth/admin.guard';

@Controller()
export class CertificatesController {
  constructor(private readonly service: CertificatesService) {}

  // 🌍 Public
  @Get('certificates')
  getAll() {
    return this.service.findAll();
  }

  // 🔐 Admin
  @UseGuards(AdminGuard)
  @Post('admin/certificates')
  create(@Body() body) {
    return this.service.create(body);
  }

  @UseGuards(AdminGuard)
  @Delete('admin/certificates/:id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}