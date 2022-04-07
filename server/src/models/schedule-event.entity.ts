import BaseModel from './base';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedule_events')
export class ScheduleEvent extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'event_data', type: 'json', nullable: true })
  eventData: any;

  @Column({ name: 'event_id', type: 'int', nullable: true })
  eventId: number;
}
