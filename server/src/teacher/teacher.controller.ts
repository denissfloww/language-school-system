import { Controller, Get } from '@nestjs/common';
import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeacherController {
  constructor(private teachersService: TeacherService) {}

  @Get()
  getRoles() {
    try {
      return this.teachersService.getTeachers();
    } catch (e) {
      console.log(e);
    }
  }
}
