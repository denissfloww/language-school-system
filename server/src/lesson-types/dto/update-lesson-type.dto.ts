import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonTypeDto } from './create-lesson-type.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateLessonTypeDto extends PartialType(CreateLessonTypeDto) {
  @IsNotEmpty()
  readonly name: string;

  readonly description: string;

  @IsNotEmpty()
  readonly color: string;
}
