import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCostStudentGroupDto {
  @IsNotEmpty()
  @IsNumber()
  costStudentGroupId: number;

  @IsNotEmpty()
  @IsNumber()
  costId: number;
}
