import { IsNotEmpty } from 'class-validator';

export class CreateLessonTypeDto {
  @IsNotEmpty()
  readonly name: string;

  readonly description: string;

  @IsNotEmpty()
  readonly color: string;
}
