import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from '../models/attendance.entity';
import { StudentsModule } from '../students/students.module';
import { Group } from '../models/group.entity';
import { Student } from '../models/student.entity';
import { GroupModule } from '../group/group.module';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, Group, Student]),
    StudentsModule,
    GroupModule,
    ScheduleModule,
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
