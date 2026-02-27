import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './certificate.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly repo: Repository<Certificate>,
  ) {}

  create(data: Partial<Certificate>) {
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