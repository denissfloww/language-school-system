import { IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  readonly userId: number;
}
