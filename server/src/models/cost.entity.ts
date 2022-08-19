import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import BaseModel from './base';

@Index('IDX_COST_NAME', ['name'], {})
@Entity('costs')
export class Cost extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'lesson_price' })
  lessonPrice: number;
}
