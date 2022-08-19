import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { CalculateModule } from '../calculate/calculate.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculatedPayment } from '../models/calculated.payment.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CalculateModule,
    MailerModule,
    TypeOrmModule.forFeature([CalculatedPayment]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
