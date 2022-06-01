import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Report } from '../models/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsService } from '../students/students.service';

@Injectable()
export class ReportsService extends TypeOrmCrudService<Report> {
  constructor(
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
    private studentService: StudentsService,
  ) {
    super(reportsRepository);
  }

  async getReportsByStudentId(studentId: number) {
    const student = await this.studentService.getStudentById(studentId);
    return student.reports;
  }
}
