import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEvent } from '../models/schedule-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEvent])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
