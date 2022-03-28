import { Injectable } from '@nestjs/common';
import { CreateLessonTypeDto } from './dto/create-lesson-type.dto';
import { UpdateLessonTypeDto } from './dto/update-lesson-type.dto';

@Injectable()
export class LessonTypesService {
  create(createLessonTypeDto: CreateLessonTypeDto) {
    return 'This action adds a new lessonType';
  }

  findAll() {
    return `This action returns all lessonTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonType`;
  }

  update(id: number, updateLessonTypeDto: UpdateLessonTypeDto) {
    return `This action updates a #${id} lessonType`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonType`;
  }
}
