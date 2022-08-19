import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Group } from '../models/group.entity';
import { StudentsService } from '../students/students.service';
import { DeleteStudentFromGroup } from './dto/delete-student-from-group';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageDto } from '../common/dtos/page.dto';
import { GroupDto } from './dto/group.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { NotFoundException } from '../exceptions/not-found.exception';
import { AlreadyExistException } from '../exceptions/already-exist.exception';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UsersService } from '../users/users.service';
import { RolesEnum } from '../auth/roles.enum';
import { TeacherService } from '../teacher/teacher.service';
import { CalculateService } from '../calculate/calculate.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    @Inject(forwardRef(() => StudentsService))
    private studentsService: StudentsService,
    private connection: Connection,
    @InjectMapper()
    private readonly mapper: Mapper,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => TeacherService))
    private teacherService: TeacherService,
    @Inject(forwardRef(() => StudentsService))
    private studentService: StudentsService,
    @Inject(forwardRef(() => CalculateService))
    private calculateService: CalculateService,
  ) {}

  async getGroupIds() {
    return await this.groupsRepository.find();
  }

  async getGroups(pageOptionsDto: PageOptionsDto) {
    const skip =
      (Number(pageOptionsDto.page) - 1) * Number(pageOptionsDto.take);

    const [groups, count] = await this.groupsRepository.findAndCount({
      relations: [
        'teacher',
        'students',
        'teacher.user',
        'students.user',
        'language',
      ],
      order: {
        createdAt: pageOptionsDto.order,
      },
      take: pageOptionsDto.take,
      skip: isNaN(skip) ? undefined : skip,
    });

    const pageMetaDto = new PageMetaDto({ itemCount: count, pageOptionsDto });

    const groupDtos = this.mapper.mapArray(groups, GroupDto, Group);

    return new PageDto(groupDtos, pageMetaDto);
  }

  async getUserGroups(userId: number) {
    const user = await this.usersService.getUserById(userId);

    if (user.roles.some((role) => role.name == RolesEnum.Admin)) {
      const groups = await this.groupsRepository.find({
        relations: [
          'teacher',
          'students',
          'teacher.user',
          'students.user',
          'language',
        ],
      });

      return this.mapper.mapArray(groups, GroupDto, Group);
    }
    if (user.roles.some((role) => role.name == RolesEnum.Teacher)) {
      const teacher = await this.teacherService.getTeacherByUserId(userId);
      const groups = await this.groupsRepository.find({
        where: { teacherId: parseInt(teacher.id) },
        relations: ['students'],
      });

      return this.mapper.mapArray(groups, GroupDto, Group);
    }
    if (user.roles.some((role) => role.name == RolesEnum.Student)) {
      const student = await this.studentsService.getStudentByUserId(userId);

      return this.getStudentGroupsDtos(student.id);
    }
  }

  async getStudentGroupsDtos(studentId: number) {
    const student = await this.studentsService.getStudentById(studentId);

    if (!student || !student.groups.length) {
      throw new NotFoundException();
    }

    const groups = student.groups;

    const groupDtos = this.mapper.mapArray(groups, GroupDto, Group);
    for (const groupDto of groupDtos) {
      Logger.debug(student.id);
      const nextMonthCalculate =
        await this.calculateService.monthlyStudentCalculateByGroup(
          student.id,
          Number(groupDto.id),
        );
      groupDto.priceNextMonth = nextMonthCalculate.priceNextMonth;

      groupDto.month = nextMonthCalculate.calculateMonth;
    }
    return groupDtos;
  }

  async getGroupById(id: number) {
    const group = await this.groupsRepository.findOne({
      where: {
        id: id,
      },
      relations: [
        'teacher',
        'students',
        'language',
        'teacher.user',
        'students.user',
      ],
    });

    if (group) {
      return this.mapper.map(group, GroupDto, Group);
    }

    throw new NotFoundException();
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    const existGroup = await this.groupsRepository.findOne({
      where: {
        name: createGroupDto.name,
      },
    });

    if (existGroup) {
      throw new AlreadyExistException();
    }

    const students = await this.studentsService.getStudentsByIds(
      createGroupDto.studentsIds,
    );

    const group = await this.groupsRepository.save({
      name: createGroupDto.name,
      description: createGroupDto.description,
      teacherId: createGroupDto.teacherId,
      languageId: createGroupDto.languageId,
      students: students,
    });

    const fullGroup = await this.groupsRepository.findOne({
      where: { id: group.id },
      relations: ['students', 'teacher.user'],
    });

    return this.mapper.map(fullGroup, GroupDto, Group);
  }

  async deleteGroup(id: number) {
    await this.groupsRepository.delete(id);
  }

  async updateGroup(updateGroupDto: UpdateGroupDto) {
    const group = await this.groupsRepository.findOne({
      where: {
        id: updateGroupDto.id,
      },
      relations: ['students'],
    });

    group.students = await this.studentsService.getStudentsByIds(
      updateGroupDto.studentsIds,
    );
    group.name = updateGroupDto.name;
    group.teacherId = updateGroupDto.teacherId;
    group.description = updateGroupDto.description;
    group.languageId = updateGroupDto.languageId;

    return await this.groupsRepository.save(group);
  }

  async getStudentGroups(studentId: number) {
    const student = await this.studentsService.getStudentById(studentId);
    Logger.debug(student);
    if (student?.groups) {
      return student.groups;
    }
    return [];
  }
}
