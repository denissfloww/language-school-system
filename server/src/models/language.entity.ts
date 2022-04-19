import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseModel from './base';
import { Group } from './group.entity';

@Index('IDX_LANGUAGE_NAME', ['name'], {})
@Entity('languages')
export class Language extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Group, (groups) => groups.language)
  groups: Group[];
}
