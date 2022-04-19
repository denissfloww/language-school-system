import { IsNotEmpty } from 'class-validator';

export class CreateLanguageDto {
  @IsNotEmpty()
  readonly name: string;

  readonly description: string;
}
