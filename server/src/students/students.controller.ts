import { Controller, Get, Query } from '@nestjs/common';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  getGroups(@Query() pageOptionsDto: PageOptionsDto) {
    return this.studentsService.getStudents(pageOptionsDto);
  }
}
