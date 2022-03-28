import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonTypeDto } from './create-lesson-type.dto';

export class UpdateLessonTypeDto extends PartialType(CreateLessonTypeDto) {}
