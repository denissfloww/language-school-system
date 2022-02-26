import { IsInt, IsNotEmpty } from 'class-validator';

export class AddStudentInGroupDto {
  @IsInt()
  @IsNotEmpty()
  readonly studentId: number;

  @IsInt()
  @IsNotEmpty()
  readonly groupId: number;
}
