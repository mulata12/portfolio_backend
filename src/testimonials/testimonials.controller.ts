import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { AdminGuard } from '../auth/admin.guard';

@Controller()
export class TestimonialsController {
  constructor(private readonly service: TestimonialsService) {}

  // 🌍 Public submit testimonial
  @Post('testimonials')
  submit(@Body() body) {
    return this.service.create(body);
  }

  // 🌍 Public view approved testimonials
  @Get('testimonials')
  getApproved() {
    return this.service.findApproved();
  }

  // 🔐 Admin view all
  @UseGuards(AdminGuard)
  @Get('admin/testimonials')
  getAll() {
    return this.service.findAll();
  }

  // 🔐 Admin approve testimonial
  @UseGuards(AdminGuard)
  @Put('admin/testimonials/:id/approve')
  approve(@Param('id') id: string) {
    return this.service.approve(+id);
  }

  // 🔐 Admin delete testimonial
  @UseGuards(AdminGuard)
  @Delete('admin/testimonials/:id')
  delete(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}