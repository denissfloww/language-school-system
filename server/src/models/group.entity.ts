import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  RelationId,
  JoinColumn,
} from 'typeorm';
import BaseModel from './base';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';

@Entity('groups')
export class Group extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @RelationId((group: Group) => group.students)
  studentsIds?: number[];

  @ManyToMany(() => Student)
  @JoinTable({
    name: 'student_group',
    joinColumns: [{ name: 'group_id' }],
    inverseJoinColumns: [{ name: 'student_id' }],
  })
  students: Student[];

  @Column({ name: 'teacher_id' })
  teacherId: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.groups)
  @JoinColumn([{ name: 'teacher_id', referencedColumnName: 'id' }])
  teacher: Teacher;
}
