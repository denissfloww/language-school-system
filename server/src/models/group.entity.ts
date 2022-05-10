import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  RelationId,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import BaseModel from './base';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';
import { Language } from './language.entity';
import { ScheduleEvent } from './schedule-event.entity';
import { Cost } from './cost.entity';

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

  @ManyToMany((type) => Student)
  @JoinTable({
    name: 'student_group',
    joinColumns: [{ name: 'group_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'student_id', referencedColumnName: 'id' }],
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

  @Column({ name: 'cost_id' })
  costId: number;

  @ManyToOne(() => Cost, (cost) => cost.groups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn([{ name: 'cost_id', referencedColumnName: 'id' }])
  cost: Cost;

  @OneToMany(() => ScheduleEvent, (scheduleEvent) => scheduleEvent.group)
  scheduleEvents: ScheduleEvent[];
}
