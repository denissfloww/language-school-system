import { Module } from '@nestjs/common';
import { LessonTypesService } from './lesson-types.service';
import { LessonTypesController } from './lesson-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonType } from '../models/lesson-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonType])],
  controllers: [LessonTypesController],
  providers: [LessonTypesService],
  exports: [LessonTypesService],
})
export class LessonTypesModule {}
