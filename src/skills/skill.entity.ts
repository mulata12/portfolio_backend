import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; // e.g., "NestJS"

  @Column()
  category!: string; 
  // e.g., "Backend", "Frontend", "AI/ML", "Database"

  @Column({ default: 1 })
  level!: number; 
  // 1–5 (optional rating system)
}