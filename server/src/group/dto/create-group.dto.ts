import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGroupDto {
  @IsNotEmpty()
  readonly name: string;

  readonly description: string;

  @IsNotEmpty()
  @IsInt()
  readonly teacherId: number;

  @IsNumber({}, { each: true })
  readonly studentsIds: number[];
}
