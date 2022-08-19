import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import BaseModel from './base';
import { User } from './user.entity';
import { Group } from './group.entity';
import { Report } from './report.entity';
import { CalculatedPayment } from './calculated.payment.entity';

@Entity('students')
export class Student extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => User, { eager: true })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'students_groups_groups',
    joinColumn: { name: 'student_id' },
    inverseJoinColumn: { name: 'group_id' },
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

  @OneToMany(() => Report, (report) => report.student)
  reports: Report[];

  @OneToMany(
    () => CalculatedPayment,
    (calculatedPayment) => calculatedPayment.student,
  )
  calculatedPayments: CalculatedPayment[];
}
