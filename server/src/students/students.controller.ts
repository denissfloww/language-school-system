import { Controller, Get, Query } from '@nestjs/common';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  getStudents(@Query() pageOptionsDto: PageOptionsDto) {
    return this.studentsService.getStudents(pageOptionsDto);
  }

  @Get('/test')
  test() {
    return this.studentsService.getStudentAttendanceForMonth();
  }
}
