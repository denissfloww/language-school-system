import { IsNotEmpty } from 'class-validator';
import { RolesEnum } from '../../auth/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  readonly firstName: string;

  readonly middleName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly role: RolesEnum;
}
