import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Certificate } from './certificate.entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly repo: Repository<Certificate>,
  ) { }

  async create(data: CreateCertificateDto) {
    const certificate = this.repo.create(data);
    return this.repo.save(certificate);
  }

  async findAll() {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}