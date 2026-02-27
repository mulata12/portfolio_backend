import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Skill]),
    AuthModule,
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}