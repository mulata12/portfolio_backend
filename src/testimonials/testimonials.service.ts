import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './testimonial.entity';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly repo: Repository<Testimonial>,
  ) {}

  // Public submit
  create(data: Partial<Testimonial>) {
    return this.repo.save(data);
  }

  // Public view (only approved)
  findApproved() {
    return this.repo.find({
      where: { approved: true },
      order: { createdAt: 'DESC' },
    });
  }

  // Admin view all
  findAll() {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  // Admin approve
  approve(id: number) {
    return this.repo.update(id, { approved: true });
  }

  // Admin delete
  remove(id: number) {
    return this.repo.delete(id);
  }
}