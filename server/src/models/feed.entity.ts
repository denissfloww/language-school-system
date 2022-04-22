import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseModel from './base';
import { Teacher } from './teacher.entity';
import { User } from './user.entity';

@Entity('feeds')
export class Feed extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  data: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.feeds)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
