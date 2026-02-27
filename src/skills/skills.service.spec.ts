import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly repo: Repository<Skill>,
  ) {}

  create(data: Partial<Skill>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}