import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({
    type: "text",
    nullable: false,
  })
  message: string;

  @CreateDateColumn()
  created: Date

  @CreateDateColumn()
  updated: Date
}
