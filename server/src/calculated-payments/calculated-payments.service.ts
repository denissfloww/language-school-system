import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CalculatedPayment } from '../models/calculated.payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CalculatedPaymentsService extends TypeOrmCrudService<CalculatedPayment> {
  constructor(
    @InjectRepository(CalculatedPayment)
    private calculatedPaymentsRepository: Repository<CalculatedPayment>,
  ) {
    super(calculatedPaymentsRepository);
  }
}
