import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseModel from './base';
import { Group } from './group.entity';
import { Student } from './student.entity';
import { Cost } from './cost.entity';

@Entity('costs_students_groups')
export class CostStudentGroup extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'group_id' })
  groupId: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'cost_id' })
  costId: number;

  @ManyToOne(() => Group)
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
  group: Group;

  @ManyToOne(() => Student)
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: Student;

  @ManyToOne(() => Cost)
  @JoinColumn([{ name: 'cost_id', referencedColumnName: 'id' }])
  cost: Cost;
}
