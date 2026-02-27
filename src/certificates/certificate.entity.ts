import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  issuer?: string;

  @Column({ nullable: true })
  link?: string;

  @CreateDateColumn()
  createdAt!: Date;
}