import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../models/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { PageDto } from '../common/dtos/page.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { StudentDto } from './dto/students.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async createStudent(dto: CreateStudentDto) {
    await this.studentsRepository.save({
      userId: dto.userId,
      parentEmail: dto.parentEmail,
      parentLastName: dto.parentLastName,
      parentMiddleName: dto.parentMiddleName,
      parentName: dto.parentName,
      parentPhone: dto.parentPhone,
    });
  }

  async getStudentById(id: number) {
    return await this.studentsRepository.findOne(id, { relations: ['groups'] });
  }

  async getStudentByUserId(userId: number) {
    return await this.studentsRepository.findOne({
      relations: ['groups'],
      where: { userId: userId },
    });
  }

  async getStudentAttendanceByGroupId(groupId: number) {

  }

  async getStudents(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.studentsRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user');

    const skip =
      (Number(pageOptionsDto.page) - 1) * Number(pageOptionsDto.take);

    if (skip) {
      queryBuilder
        .orderBy('student.createdAt', pageOptionsDto.order)
        .skip(skip)
        .take(pageOptionsDto.take);
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const dtos: StudentDto[] = entities.map((student) => {
      return {
        id: student.id,
        firstName: student.user.firstName,
        middleName: student.user.middleName,
        lastName: student.user.lastName,
        userId: student.user.id,
      };
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(dtos, pageMetaDto);
  }
}
