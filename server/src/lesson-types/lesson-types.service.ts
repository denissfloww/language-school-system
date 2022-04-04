import { Injectable } from '@nestjs/common';
import { CreateLessonTypeDto } from './dto/create-lesson-type.dto';
import { UpdateLessonTypeDto } from './dto/update-lesson-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonType } from '../models/lesson-types.entity';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { PageDto } from '../common/dtos/page.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { NotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class LessonTypesService {
  constructor(
    @InjectRepository(LessonType)
    private lessonTypesRepository: Repository<LessonType>,
  ) {}

  async create(createLessonTypeDto: CreateLessonTypeDto) {
    return await this.lessonTypesRepository.save({
      ...createLessonTypeDto,
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const skip =
      (Number(pageOptionsDto.page) - 1) * Number(pageOptionsDto.take);

    const [list, count] = await this.lessonTypesRepository.findAndCount({
      order: {
        createdAt: pageOptionsDto.order,
      },
      take: pageOptionsDto.take,
      skip: skip,
    });

    const pageMetaDto = new PageMetaDto({ itemCount: count, pageOptionsDto });
    return new PageDto(list, pageMetaDto);
  }

  async findOne(id: number) {
    const lessonType = await this.lessonTypesRepository.findOne(id);

    if (lessonType) {
      return lessonType;
    }

    throw new NotFoundException();
  }

  async update(id: number, updateLessonTypeDto: UpdateLessonTypeDto) {
    const lessonType = await this.lessonTypesRepository.findOne(id);

    if (lessonType) {
      await this.lessonTypesRepository.update(id, {
        ...updateLessonTypeDto,
      });

      return;
    }

    throw new NotFoundException();
  }

  async remove(id: number) {
    const lessonType = await this.lessonTypesRepository.findOne(id);

    if (lessonType) {
      await this.lessonTypesRepository.remove(lessonType);

      return;
    }

    throw new NotFoundException();
  }
}
