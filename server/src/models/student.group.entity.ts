// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   OneToOne,
//   PrimaryColumn,
//   JoinColumn,
// } from 'typeorm';
// import BaseModel from './base';
// import { Student } from './student.entity';
// import { Group } from './group.entity';
//
// @Entity('student_group')
// export class StudentGroup extends BaseModel {
//   @PrimaryGeneratedColumn()
//   id: string;
//
//   @PrimaryColumn('int', { name: 'student_id' })
//   studentId: number;
//
//   @PrimaryColumn('int', { name: 'group_id' })
//   groupId: number;
//
//   @OneToOne((type) => Student)
//   @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
//   student: Student;
//
//   @OneToOne((type) => Group)
//   @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
//   group: Group;
// }
