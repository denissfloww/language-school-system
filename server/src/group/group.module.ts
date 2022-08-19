import { forwardRef, Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '../roles/roles.module';
import { Student } from '../models/student.entity';
import { Group } from '../models/group.entity';
import { Teacher } from '../models/teacher.entity';
import { User } from '../models/user.entity';
import { StudentsModule } from '../students/students.module';
import { StudentsService } from '../students/students.service';
import { UsersModule } from '../users/users.module';
import { TeacherModule } from '../teacher/teacher.module';
import { CalculateModule } from '../calculate/calculate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Group, Teacher, User]),
    RolesModule,
    forwardRef(() => StudentsModule),
    forwardRef(() => UsersModule),
    TeacherModule,
    forwardRef(() => CalculateModule),
  ],
  controllers: [GroupController],
  providers: [GroupService, StudentsService],
  exports: [GroupService],
})
export class GroupModule {}
