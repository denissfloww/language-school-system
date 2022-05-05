import { PartialType } from '@nestjs/mapped-types';
import { CreateCalculateDto } from './create-calculate.dto';

export class UpdateCalculateDto extends PartialType(CreateCalculateDto) {}
