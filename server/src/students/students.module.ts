import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../models/student.entity';

@Module({
  providers: [StudentsService],
  controllers: [StudentsController],
  imports: [TypeOrmModule.forFeature([Student])],
  exports: [StudentsService],
})
export class StudentsModule {}
