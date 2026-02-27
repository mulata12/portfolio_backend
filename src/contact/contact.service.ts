import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './contact-message.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly repo: Repository<ContactMessage>,
  ) {}

  create(data: Partial<ContactMessage>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}