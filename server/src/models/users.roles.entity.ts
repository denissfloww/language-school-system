import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import BaseModel from './base';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity('users_roles')
export class UsersRolesEntity extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn('int')
  userId: number;

  @PrimaryColumn('int')
  roleId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;
}
