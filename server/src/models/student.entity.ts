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

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  shortName: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Student)
  @JoinTable({
    name: 'student_group',
    joinColumns: [{ name: 'studentId' }],
    inverseJoinColumns: [{ name: 'groupId' }],
  })
  students: Group[];
}
