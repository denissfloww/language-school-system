import { forwardRef, Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../models/student.entity';
import { GroupModule } from '../group/group.module';
import { Group } from '../models/group.entity';
import { CalculateModule } from '../calculate/calculate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Group]),
    forwardRef(() => GroupModule),
    forwardRef(() => CalculateModule),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
