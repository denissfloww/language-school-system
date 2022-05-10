import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import BaseModel from './base';
import { User } from './user.entity';
import { RolesEnum } from '../auth/roles.enum';

@Entity('roles')
export class Role extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: RolesEnum;

  @Column()
  description: string;

  @Column()
  label: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_role',
    joinColumns: [{ name: 'role_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  users: User[];
}
