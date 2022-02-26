import { IsNotEmpty } from 'class-validator';
import { RolesEnum } from '../../auth/roles.enum';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly firstName: string;

  readonly middleName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly role: RolesEnum;
}
