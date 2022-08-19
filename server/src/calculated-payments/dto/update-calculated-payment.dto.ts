import { PartialType } from '@nestjs/mapped-types';
import { CreateCalculatedPaymentDto } from './create-calculated-payment.dto';

export class UpdateCalculatedPaymentDto extends PartialType(CreateCalculatedPaymentDto) {}
