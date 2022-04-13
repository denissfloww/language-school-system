import { IsNotEmpty } from 'class-validator';
import { RolesEnum } from '../../auth/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  readonly firstName: string;

  readonly middleName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly roles: RolesEnum[];

  readonly parentEmail: string;

  readonly parentLastName: string;

  readonly parentMiddleName: string;

  readonly parentName: string;

  readonly parentPhone: string;
}
