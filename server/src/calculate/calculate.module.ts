import { forwardRef, Module } from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { CalculateController } from './calculate.controller';
import { ScheduleModule } from '../schedule/schedule.module';
import { AttendanceModule } from '../attendance/attendance.module';
import { GroupModule } from '../group/group.module';
import { CostsModule } from '../costs/costs.module';
import { StudentsModule } from '../students/students.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  exports: [CalculateService],
  imports: [
    ScheduleModule,
    AttendanceModule,
    forwardRef(() => GroupModule),
    CostsModule,
    forwardRef(() => StudentsModule),
    MailerModule,
  ],
  controllers: [CalculateController],
  providers: [CalculateService],
})
export class CalculateModule {}
