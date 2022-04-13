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

@Entity('user_role')
export class UserRoleEntity extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn('int', { name: 'user_id' })
  userId: number;

  @PrimaryColumn('int', { name: 'role_id' })
  roleId: number;

  @OneToOne(() => User)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToOne(() => Role)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Role;
}
