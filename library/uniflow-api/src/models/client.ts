import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import {ProgramClient} from "./program-client";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
    nullable: false,
  })
  name: string;

  @OneToMany(type => ProgramClient, programClient => programClient.client, {
    cascade: ['insert']
  })
  programs: ProgramClient[];

  @CreateDateColumn()
  created: Date

  @CreateDateColumn()
  updated: Date
}
