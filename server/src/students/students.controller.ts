import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Student } from '../models/student.entity';
import { PageOptionsDto } from '../common/dtos/page-options.dto';

@Crud({
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
  model: {
    type: Student,
  },
  query: {
    alwaysPaginate: true,
    join: {},
  },
})
@Controller('students')
export class StudentsController implements CrudController<Student> {
  constructor(public service: StudentsService) {}

  @Get('/light')
  getStudentsLight(@Query() pageOptionsDto: PageOptionsDto) {
    return this.service.getStudents(pageOptionsDto);
  }

  @Get('')
  getStudents(@Query() pageOptionsDto: PageOptionsDto) {
    return this.service.getStudents(pageOptionsDto);
  }

  @Get('/user/:userId')
  async getStudentByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.service.getStudentDtoByUserId(userId);
  }

  @Get(':id')
  async getStudentById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getStudentDtoById(id);
  }
}
