import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessonTypesService } from './lesson-types.service';
import { CreateLessonTypeDto } from './dto/create-lesson-type.dto';
import { UpdateLessonTypeDto } from './dto/update-lesson-type.dto';

@Controller('lesson-types')
export class LessonTypesController {
  constructor(private readonly lessonTypesService: LessonTypesService) {}

  @Post()
  create(@Body() createLessonTypeDto: CreateLessonTypeDto) {
    return this.lessonTypesService.create(createLessonTypeDto);
  }

  @Get()
  findAll() {
    return this.lessonTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonTypeDto: UpdateLessonTypeDto) {
    return this.lessonTypesService.update(+id, updateLessonTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonTypesService.remove(+id);
  }
}
