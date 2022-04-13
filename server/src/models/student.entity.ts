import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import BaseModel from './base';
import { User } from './user.entity';
import { Group } from './group.entity';

@Entity('students')
export class Student extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => User)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'student_group',
    joinColumns: [{ name: 'student_id' }],
    inverseJoinColumns: [{ name: 'group_id' }],
  })
  groups: Group[];

  @Column({ name: 'parent_name' })
  parentName: string;

  @Column({ name: 'parent_middle_name' })
  parentMiddleName: string;

  @Column({ name: 'parent_last_name' })
  parentLastName: string;

  @Column({ name: 'parent_email' })
  parentEmail: string;

  @Column({ name: 'parent_phone' })
  parentPhone: string;
}
