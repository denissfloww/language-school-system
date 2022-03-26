import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import BaseModel from './base';
import { User } from './user.entity';
import { Group } from './group.entity';

@Entity('teachers')
export class Teacher extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Group, (group) => group.teacher)
  groups: Group[];
}
