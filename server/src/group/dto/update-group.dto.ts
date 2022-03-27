import { CreateGroupDto } from './create-group.dto';
import { IsInt } from 'class-validator';

export class UpdateGroupDto extends CreateGroupDto {
  @IsInt()
  readonly id: number;
}
