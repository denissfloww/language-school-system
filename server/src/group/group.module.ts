import { forwardRef, Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '../roles/roles.module';
import { StudentsModule } from '../students/students.module';
import { Student } from '../models/student.entity';
import { Group } from '../models/group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Group]),
    RolesModule,
    StudentsModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
