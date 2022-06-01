import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../models/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { PageDto } from '../common/dtos/page.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { StudentDto } from './dto/students.dto';
import { GroupService } from '../group/group.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CalculateService } from '../calculate/calculate.service';
import { NotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @Inject(forwardRef(() => GroupService)) private groupsService: GroupService,
    @Inject(forwardRef(() => CalculateService))
    private calculateService: CalculateService,
    @InjectMapper()
    private readonly mapper: Mapper,
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
    return await this.studentsRepository.findOne({
      where: { id: id },
      relations: ['groups', 'user', 'reports', 'reports.group', 'reports.test'],
    });
  }

  async getStudentDtoById(id: number) {
    const student = await this.getStudentById(id);

    if (student) {
      return this.mapper.map(student, StudentDto, Student);
    }

    throw new NotFoundException();
  }

  async getStudentsByIds(ids: number[]) {
    return await this.studentsRepository.findByIds(ids);
  }

  async getStudentByUserId(userId: number) {
    return await this.studentsRepository.findOne({
      relations: ['groups'],
      where: { userId: userId },
    });
  }

  async getStudentDtoByUserId(userId: number) {
    const student = await this.getStudentByUserId(userId);
    return this.mapper.map(student, StudentDto, Student);
  }

  async studentSave(student: Student) {
    await this.studentsRepository.save(student);
  }

  async updateStudent(dto: UpdateStudentDto, studentId: number) {
    await this.studentsRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const student = await this.studentsRepository.findOne({
          where: { id: studentId },
        });

        student.parentName = dto.parentName;
        student.parentMiddleName = dto.parentMiddleName;
        student.parentLastName = dto.parentLastName;
        student.parentPhone = dto.parentPhone;
        student.parentEmail = dto.parentEmail;

        await transactionalEntityManager.save<Student>(student);
      },
    );
  }

  async studentsSave(students: Student[]) {
    await this.studentsRepository.save(students);
  }

  async getStudentAttendanceForMonth() {
    //взять все группы одного студента
    //взять период с предыдущего месяца 25 числа по 25 число текущего месяца

    return 1;
  }

  async getStudentsByGroupId(groupId: number) {
    const group = await this.groupsService.getGroupById(groupId);
    return group?.students;
  }

  async getStudents(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.studentsRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user');

    const skip =
      (Number(pageOptionsDto.page) - 1) * Number(pageOptionsDto.take);

    if (skip) {
      queryBuilder
        .orderBy('student.created_at', pageOptionsDto.order)
        .skip(isNaN(skip) ? undefined : skip)
        .take(pageOptionsDto.take);
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const dtos: StudentDto[] = [];
    for (const student of entities) {
      Logger.debug(student.id);
      const groupsPayment =
        await this.calculateService.monthlyStudentCalculateInAllGroups(
          student.id,
        );

      dtos.push({
        id: student.id,
        firstName: student.user.firstName,
        middleName: student.user.middleName,
        lastName: student.user.lastName,
        userId: student.user.id,
        parentPhone: student.parentPhone,
        parentEmail: student.parentEmail,
        parentLastName: student.parentLastName,
        parentMiddleName: student.parentMiddleName,
        parentName: student.parentName,
        groupsPayment: groupsPayment,
      });
    }

    // const dtos: StudentDto[] = entities.map((student) => {
    //   const lessonPrice =
    //     this.calculateService.monthlyStudentCalculateInAllGroups(student.id);
    //   return {
    //     id: student.id,
    //     firstName: student.user.firstName,
    //     middleName: student.user.middleName,
    //     lastName: student.user.lastName,
    //     userId: student.user.id,
    //     parentPhone: student.parentPhone,
    //     parentEmail: student.parentEmail,
    //     parentLastName: student.parentLastName,
    //     parentMiddleName: student.parentMiddleName,
    //     parentName: student.parentName,
    //   };
    // });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(dtos, pageMetaDto);
  }
}
