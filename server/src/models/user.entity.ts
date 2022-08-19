import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
import BaseModel from './base';
import { Role } from './role.entity';
import { Feed } from './feed.entity';
import { Student } from './student.entity';

@Entity('users')
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'middle_name', nullable: true })
  middleName: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @OneToOne(() => Student, (student) => student.user)
  student: Student | null;

  @ManyToMany(() => Role, (r) => r.users)
  @JoinTable({
    name: 'users_roles_roles',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];

  @OneToMany(() => Feed, (feed) => feed.user)
  feeds: Feed[];
}
