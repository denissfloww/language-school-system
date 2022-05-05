import BaseModel from './base';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Group } from './group.entity';
import { AttendanceMarkEnum } from '../attendance/AttendanceMarkEnum';

@Entity('attendance')
export class Attendance extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Student)
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: Student;

  @OneToOne(() => Group)
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
  group: Group;

  @Column({ type: 'timestamp with time zone', name: 'event_date' })
  eventDate: Date;

  @Column({ type: 'varchar', name: 'attendance_mark' })
  attendanceMark: AttendanceMarkEnum;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'group_id' })
  groupId: number;
}
