import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';
import BaseModel from './base';
import { User } from './user.entity';
import { Group } from './group.entity';

@Entity('teachers')
export class Teacher extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => User)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => Group, (group) => group.teacher)
  groups: Group[];
}
