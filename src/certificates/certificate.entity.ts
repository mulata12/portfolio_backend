import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  issuer?: string;

  @Column({ nullable: true })
  link?: string;

  // image for displaying certificate
  @Column({ nullable: true })
  file?: string;

  @CreateDateColumn()
  createdAt: Date;
}