import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
  ) {}

  create(data: Partial<Project>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  update(id: number, data: Partial<Project>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
