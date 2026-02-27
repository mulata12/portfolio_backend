import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AdminGuard } from '../auth/admin.guard';

@Controller()
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  // 🌍 PUBLIC — frontend portfolio
  @Get('projects')
  getProjects() {
    return this.service.findAll();
  }

  // 🔐 ADMIN — manage content
  @UseGuards(AdminGuard)
  @Post('admin/projects')
  createProject(@Body() body) {
    return this.service.create(body);
  }

  @UseGuards(AdminGuard)
  @Put('admin/projects/:id')
  updateProject(@Param('id') id: number, @Body() body) {
    return this.service.update(+id, body);
  }

  @UseGuards(AdminGuard)
  @Delete('admin/projects/:id')
  deleteProject(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
