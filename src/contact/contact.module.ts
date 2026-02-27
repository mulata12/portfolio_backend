import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactMessage } from './contact-message.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactMessage]),
    AuthModule,
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}