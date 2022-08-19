import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  RelationId,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import BaseModel from './base';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';
import { Language } from './language.entity';
import { ScheduleEvent } from './schedule-event.entity';
import { Report } from './report.entity';
import { CalculatedPayment } from './calculated.payment.entity';

@Entity('groups')
export class Group extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @RelationId((group: Group) => group.students)
  studentsIds: number[];

  @ManyToMany(() => Student, (s) => s.groups)
  @JoinTable({
    name: 'students_groups_groups',
    joinColumn: { name: 'group_id' },
    inverseJoinColumn: { name: 'student_id' },
  })
  students: Student[];

  @Column({ name: 'teacher_id' })
  teacherId: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.groups, { eager: true })
  @JoinColumn([{ name: 'teacher_id', referencedColumnName: 'id' }])
  teacher: Teacher;

  @Column({ name: 'language_id' })
  languageId: number;

  @ManyToOne(() => Language, (languages) => languages.groups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn([{ name: 'language_id', referencedColumnName: 'id' }])
  language: Language;

  @OneToMany(() => ScheduleEvent, (scheduleEvent) => scheduleEvent.group)
  scheduleEvents: ScheduleEvent[];

  @OneToMany(() => Report, (report) => report.group)
  reports: Report[];

  @OneToMany(
    () => CalculatedPayment,
    (calculatedPayment) => calculatedPayment.group,
  )
  calculatedPayments: CalculatedPayment[];
}
