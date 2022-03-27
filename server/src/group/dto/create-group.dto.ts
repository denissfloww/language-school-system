import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  readonly name: string;

  readonly description: string;

  @IsNotEmpty()
  @IsInt()
  readonly teacherId: number;

  @IsArray()
  readonly studentsIds: number[];
}
