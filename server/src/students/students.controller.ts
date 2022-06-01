import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  getStudents(@Query() pageOptionsDto: PageOptionsDto) {
    return this.studentsService.getStudents(pageOptionsDto);
  }

  @Get('/user/:userId')
  async getStudentByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.studentsService.getStudentDtoByUserId(userId);
  }

  @Get(':id')
  async getStudentById(@Param('id', ParseIntPipe) id: number) {
    return await this.studentsService.getStudentDtoById(id);
  }

  @Get('/test')
  test() {
    return this.studentsService.getStudentAttendanceForMonth();
  }
}
