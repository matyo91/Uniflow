import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { ProgramTagEntity } from "../entity"

@Entity({
  name: 'tag'
})
export default class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uid: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
    nullable: false,
  })
  name: string;

  @OneToMany(type => ProgramTagEntity, programTag => programTag.tag, {
    cascade: ['insert']
  })
  programs: ProgramTagEntity[];

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
