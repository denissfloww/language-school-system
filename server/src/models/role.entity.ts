import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import BaseModel from './base';
import { User } from './user.entity';

@Entity('roles')
export class Role extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'roleId' }],
    inverseJoinColumns: [{ name: 'userId' }],
  })
  users: User[];
}
