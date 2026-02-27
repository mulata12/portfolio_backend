import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('text')
  content!: string;

  @Column({ default: false })
  approved!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}