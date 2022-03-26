import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import BaseModel from './base';
import { Role } from './role.entity';

@Entity('users')
export class User extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column({ name: 'firstname' })
  firstName: string;

  @Column({ name: 'lastname' })
  lastName: string;

  @Column({ name: 'middlename' })
  middleName: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'roleId' }],
  })
  roles: Role[];
}
