import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @CreateDateColumn()
  created: Date

  @CreateDateColumn()
  updated: Date
}
