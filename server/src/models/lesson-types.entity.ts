import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseModel from './base';

@Entity('lesson_types')
export class LessonType extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
