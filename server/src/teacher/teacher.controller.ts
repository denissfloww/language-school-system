import { Controller, Get, Query } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { PageOptionsDto } from '../common/dtos/page-options.dto';

@Controller('teachers')
export class TeacherController {
  constructor(private teachersService: TeacherService) {}

  @Get()
  getTeachers(@Query() pageOptionsDto: PageOptionsDto) {
    try {
      return this.teachersService.getTeachers(pageOptionsDto);
    } catch (e) {
      console.log(e);
    }
  }
}
