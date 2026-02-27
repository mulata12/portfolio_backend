import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column({ nullable: true })
  githubUrl?: string;

  @Column({ nullable: true })
  liveUrl?: string;

  @Column('simple-array')
  technologies!: string[];

  @CreateDateColumn()
  createdAt!: Date;
}
