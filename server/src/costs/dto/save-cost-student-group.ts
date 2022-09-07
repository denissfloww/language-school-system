import { IsNotEmpty, IsNumber } from 'class-validator';

export class SaveCostStudentGroupDto {
  @IsNotEmpty()
  @IsNumber()
  groupId: number;

  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  costId: number;
}
