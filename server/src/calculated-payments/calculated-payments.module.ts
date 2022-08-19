import { Module } from '@nestjs/common';
import { CalculatedPaymentsService } from './calculated-payments.service';
import { CalculatedPaymentsController } from './calculated-payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculatedPayment } from '../models/calculated.payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalculatedPayment])],
  controllers: [CalculatedPaymentsController],
  providers: [CalculatedPaymentsService],
})
export class CalculatedPaymentsModule {}
