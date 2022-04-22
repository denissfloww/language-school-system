import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseModel from './base';
import { Group } from './group.entity';

@Index('IDX_COST_NAME', ['name'], {})
@Entity('costs')
export class Cost extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'lesson_price' })
  lessonPrice: number;

  @OneToMany(() => Group, (groups) => groups.cost)
  groups: Group[];
}
