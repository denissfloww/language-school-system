import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonType } from '../models/lesson-types.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class LessonTypesService extends TypeOrmCrudService<LessonType> {
  constructor(
    @InjectRepository(LessonType)
    private lessonTypesRepository: Repository<LessonType>,
  ) {
    super(lessonTypesRepository);
  }
}
