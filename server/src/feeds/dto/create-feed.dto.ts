import { IsNotEmpty } from 'class-validator';

export class CreateFeedDto {
  @IsNotEmpty()
  readonly name: string;

  readonly description: string;

  @IsNotEmpty()
  readonly data: string;
}
