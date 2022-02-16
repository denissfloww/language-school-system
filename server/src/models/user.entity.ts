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

  @Column()
  full_name: string;

  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'roleId' }],
  })
  roles: Role[];
}
