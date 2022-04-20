import { IsInt, IsNotEmpty } from 'class-validator';

export class ChangePasswordByAdminDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  newPassword: string;
}
