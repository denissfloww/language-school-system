import { RolesEnum } from '../../auth/roles.enum';

export class CreatedUserDto {
  readonly id: string;
  readonly firstName: string;

  readonly middleName?: string;

  readonly lastName: string;

  readonly password: string;

  readonly roles: RolesEnum[];
  readonly login: string;
}
