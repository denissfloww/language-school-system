import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { LessonTypesService } from './lesson-types.service';
import { CreateLessonTypeDto } from './dto/create-lesson-type.dto';
import { UpdateLessonTypeDto } from './dto/update-lesson-type.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';

@Controller('lesson-types')
export class LessonTypesController {
  constructor(private readonly lessonTypesService: LessonTypesService) {}

  @Post()
  create(@Body() createLessonTypeDto: CreateLessonTypeDto) {
    return this.lessonTypesService.create(createLessonTypeDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.lessonTypesService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonTypesService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLessonTypeDto: UpdateLessonTypeDto,
  ) {
    return await this.lessonTypesService.update(id, updateLessonTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.lessonTypesService.remove(id);
  }
}
