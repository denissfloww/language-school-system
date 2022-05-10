import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import BaseModel from './base';
import { Role } from './role.entity';
import { ScheduleEvent } from './schedule-event.entity';
import { Feed } from './feed.entity';
import { Student } from './student.entity';

@Entity('users')
export class User extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  login: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'middle_name' })
  middleName: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @OneToOne(() => Student, (student) => student.user)
  student: Student | null;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: Role[];

  @OneToMany(() => Feed, (feed) => feed.user)
  feeds: Feed[];
}
