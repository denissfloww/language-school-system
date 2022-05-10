import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly firstName: string;

  readonly middleName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly birthDate: string;

  @IsMobilePhone('any')
  readonly phone?: string;

  @IsEmail()
  readonly email?: string;

  readonly parentName?: string;

  readonly parentMiddleName?: string;

  readonly parentLastName?: string;

  readonly parentEmail?: string;

  readonly parentPhone?: string;
}
