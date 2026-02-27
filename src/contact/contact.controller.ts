import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { AdminGuard } from '../auth/admin.guard';

@Controller()
export class ContactController {
  constructor(private readonly service: ContactService) {}

  // 🌍 Public submit
  @Post('contact')
  sendMessage(@Body() body) {
    return this.service.create(body);
  }

  // 🔐 Admin view
  @UseGuards(AdminGuard)
  @Get('admin/contact')
  getMessages() {
    return this.service.findAll();
  }

  @UseGuards(AdminGuard)
  @Delete('admin/contact/:id')
  delete(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}