import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { Admin } from './auth/admin.entity';
import { AdminModule } from './admin/admin.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { CertificatesModule } from './certificates/certificates.module';
import { ContactModule } from './contact/contact.module';
import { TestimonialsModule } from './testimonials/testimonials.module';


@Module({
  imports: [
    // Load .env globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Database connection
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...(await databaseConfig()),
        entities: [Admin],
      }),
    }),

    // Feature modules
    AuthModule,
    AdminModule,
    ProjectsModule,
    SkillsModule,
    CertificatesModule,
    ContactModule,
    TestimonialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
