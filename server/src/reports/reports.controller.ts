import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Report } from '../models/report.entity';

@Crud({
  model: {
    type: Report,
  },
  query: {
    alwaysPaginate: true,
    join: {
      student: {
        eager: true,
      },
      group: {
        eager: true,
      },
      'student.user': {
        eager: true,
        exclude: ['password'],
      },
      test: {
        eager: true,
      },
    },
  },
})
@Controller('reports')
export class ReportsController implements CrudController<Report> {
  constructor(public service: ReportsService) {}

  @Get('/student/:studentId')
  findOne(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.service.getReportsByStudentId(studentId);
  }
}
