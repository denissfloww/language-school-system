import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import BaseModel from './base';
import { Student } from './student.entity';
import { User } from './user.entity';
import { Teacher } from './teacher.entity';

@Entity('groups')
export class Group extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Student)
  @JoinTable({
    name: 'student_group',
    joinColumns: [{ name: 'groupId' }],
    inverseJoinColumns: [{ name: 'studentId' }],
  })
  students: Student[];

  @Column()
  teacherId: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.groups)
  teacher: Teacher;
}
