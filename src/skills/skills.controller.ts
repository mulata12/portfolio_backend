import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { AdminGuard } from '../auth/admin.guard';

@Controller()
export class SkillsController {
  constructor(private readonly service: SkillsService) {}

  // 🌍 Public
  @Get('skills')
  getSkills() {
    return this.service.findAll();
  }

  // 🔐 Admin
  @UseGuards(AdminGuard)
  @Post('admin/skills')
  createSkill(@Body() body) {
    return this.service.create(body);
  }

  @UseGuards(AdminGuard)
  @Delete('admin/skills/:id')
  deleteSkill(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}