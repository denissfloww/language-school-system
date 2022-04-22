import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  readonly name: string;

  readonly description: string;

  @IsNotEmpty()
  @IsInt()
  readonly teacherId: number;

  @IsNotEmpty()
  @IsInt()
  readonly languageId: number;

  @IsNotEmpty()
  @IsInt()
  readonly costId: number;

  @IsNumber({}, { each: true })
  readonly studentsIds: number[];
}
