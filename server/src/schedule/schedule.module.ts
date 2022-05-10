import { forwardRef, Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEvent } from '../models/schedule-event.entity';
import { Student } from '../models/student.entity';
import { User } from '../models/user.entity';
import { Group } from '../models/group.entity';
import { StudentsModule } from '../students/students.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleEvent, Student, User, Group]),
    forwardRef(() => StudentsModule),
    AuthModule,
    forwardRef(() => UsersModule),
    TeacherModule,
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
