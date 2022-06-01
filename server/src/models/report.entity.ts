import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseModel from './base';
import { Student } from './student.entity';
import { Test } from './test.entity';
import { Group } from './group.entity';

@Entity('reports')
export class Report extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'report_date' })
  reportDate: string;

  @Column({ name: 'test_scored' })
  testScored: number;

  @Column()
  description: string;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'test_id' })
  testId?: number;

  @Column({ name: 'group_id' })
  groupId: number;

  @ManyToOne(() => Student, (student) => student.reports, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: Student;

  @ManyToOne(() => Test, (test) => test.reports, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'test_id', referencedColumnName: 'id' }])
  test?: Test;

  @ManyToOne(() => Group, (group) => group.reports, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
  group: Group;
}
