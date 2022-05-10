import { IsEmail, IsMobilePhone } from 'class-validator';

export class UpdateStudentDto {
  @IsEmail()
  readonly parentEmail: string;

  readonly parentLastName: string;

  readonly parentMiddleName: string;

  readonly parentName: string;

  @IsMobilePhone('any')
  readonly parentPhone: string;
}
