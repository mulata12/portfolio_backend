import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testimonial } from './testimonial.entity';
import { TestimonialsController } from './testimonials.controller';
import { TestimonialsService } from './testimonials.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Testimonial]),
    AuthModule,
  ],
  controllers: [TestimonialsController],
  providers: [TestimonialsService],
})
export class TestimonialsModule {}