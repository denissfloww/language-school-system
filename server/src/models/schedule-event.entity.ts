import BaseModel from './base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group.entity';

@Entity('schedule_events')
export class ScheduleEvent extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'event_data', type: 'json', nullable: true })
  eventData: any;

  @Column({ name: 'event_id', type: 'int', nullable: true })
  eventId: number;

  @Column({ name: 'group_id' })
  groupId: number;

  @ManyToOne(() => Group, (group) => group.scheduleEvents, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
  group: Group;
}
