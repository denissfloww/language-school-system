import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import BaseModel from './base';
import { Student } from './student.entity';
import { Group } from './group.entity';

@Entity('student_group')
export class StudentGroup extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn('int')
  studentId: number;

  @PrimaryColumn('int')
  groupId: number;

  @OneToOne(() => Student)
  @JoinColumn()
  student: Student;

  @OneToOne(() => Group)
  @JoinColumn()
  group: Group;
}
