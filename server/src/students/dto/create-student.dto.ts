import { IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  readonly userId: number;

  readonly parentEmail: string;

  readonly parentLastName: string;

  readonly parentMiddleName: string;

  readonly parentName: string;

  readonly parentPhone: string;
}
