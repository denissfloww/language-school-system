import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteGroupDto {
  @IsNotEmpty()
  @IsInt()
  readonly id: number;
}
