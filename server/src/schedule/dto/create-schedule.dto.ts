import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsNumber()
  readonly eventId: number;
  @IsNotEmpty()
  readonly data: any;
}
