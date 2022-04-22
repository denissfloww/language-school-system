import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateCostDto {
  @IsNotEmpty()
  readonly name: string;

  readonly description: string;

  @IsDecimal()
  readonly lessonPrice: number;
}
