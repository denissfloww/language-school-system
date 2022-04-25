import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '../roles/roles.module';
import { StudentsModule } from '../students/students.module';
import { Student } from '../models/student.entity';
import { Group } from '../models/group.entity';
import { Teacher } from '../models/teacher.entity';
import { User } from '../models/user.entity';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Group, Teacher, User]),
    RolesModule,
    StudentsModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
