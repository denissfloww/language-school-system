import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  PrimaryColumn,
  JoinColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import BaseModel from './base';
import { Student } from './student.entity';
import { Group } from './group.entity';

@Entity('student_group')
export class StudentGroup extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn({ name: 'student_id' })
  studentId: number;

  @PrimaryColumn({ name: 'group_id' })
  groupId: number;

  @OneToOne(() => Student)
  @JoinTable()
  student: Student;

  @OneToOne(() => Group)
  @JoinTable()
  group: Group;
}
