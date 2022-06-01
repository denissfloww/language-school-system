import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import BaseModel from './base';
import { Group } from './group.entity';
import { Report } from './report.entity';

@Entity('tests')
export class Test extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  points: number;

  @OneToMany(() => Report, (report) => report.test)
  reports: Report[];
}
