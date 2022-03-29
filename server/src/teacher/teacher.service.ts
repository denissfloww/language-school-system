import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from '../models/teacher.entity';
import { Repository } from 'typeorm';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { PageDto } from '../common/dtos/page.dto';
import { GroupDto } from '../group/dto/group.dto';
import { TeacherDto } from './dtos/teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async createTeacher(userId: number) {
    await this.teacherRepository.save({
      userId: userId,
    });
  }

  async getTeachers(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.teacherRepository
      .createQueryBuilder('teacher')
      .leftJoinAndSelect('teacher.user', 'user');
    const skip =
      (Number(pageOptionsDto.page) - 1) * Number(pageOptionsDto.take);

    if (skip) {
      queryBuilder
        .orderBy('teacher.createdAt', pageOptionsDto.order)
        .skip(skip)
        .take(pageOptionsDto.take);
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const dtos: TeacherDto[] = entities.map((teacher) => {
      return {
        id: teacher.id,
        firstName: teacher.user.firstName,
        middleName: teacher.user.middleName,
        lastName: teacher.user.lastName,
        userId: teacher.user.id,
      };
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(dtos, pageMetaDto);
  }
}
