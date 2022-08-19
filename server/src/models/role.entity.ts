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
    name: 'users_roles_roles',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}
