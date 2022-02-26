import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteStudentFromGroup {
  @IsInt()
  @IsNotEmpty()
  readonly studentId: number;

  @IsInt()
  @IsNotEmpty()
  readonly groupId: number;
}
