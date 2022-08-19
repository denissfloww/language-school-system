import BaseModel from './base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Group } from './group.entity';

@Entity('calculated_payments')
export class CalculatedPayment extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'payment_sum' })
  paymentSum: number;

  @Column({ name: 'calculation_month' })
  calculationMonth: number;

  @Column({ name: 'calculation_date' })
  calculationDate: Date;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'group_id' })
  groupId: number;

  @ManyToOne(() => Student, (student) => student.calculatedPayments, {
    cascade: true,
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: Student;

  @ManyToOne(() => Group, (group) => group.calculatedPayments, {
    cascade: true,
  })
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
  group: Group;
}
