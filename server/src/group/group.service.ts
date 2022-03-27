import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Group } from '../models/group.entity';
import { AddStudentInGroupDto } from './dto/add-student-in-group.dto';
import { StudentsService } from '../students/students.service';
import { DeleteStudentFromGroup } from './dto/delete-student-from-group';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageDto } from '../common/dtos/page.dto';
import { GroupDto } from './dto/group.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { Student } from '../models/student.entity';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    private studentsService: StudentsService,
    private connection: Connection,
  ) {}

  async getGroups(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.teacher', 'teacher')
      .leftJoinAndSelect('teacher.user', 'user');

    queryBuilder
      .orderBy('group.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const dtos: GroupDto[] = entities.map((group) => {
      return {
        id: group.id,
        name: group.name,
        desc: group.description,
        teacher: {
          id: group.teacher.id,
          firstName: group.teacher.user.firstName,
          middleName: group.teacher.user.middleName,
          lastName: group.teacher.user.lastName,
          userId: group.teacher.user.id,
        },
      };
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(dtos, pageMetaDto);
  }

  async getGroup(id: number) {
    const group = await this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.teacher', 'teacher')
      .leftJoinAndSelect('teacher.user', 'user')
      .where('group.id = :id', { id: id })
      .getOne();

    const groupDto: GroupDto = {
      id: group.id,
      name: group.name,
      desc: group.description,
      teacher: {
        id: group.teacher.id,
        firstName: group.teacher.user.firstName,
        middleName: group.teacher.user.middleName,
        lastName: group.teacher.user.lastName,
        userId: group.teacher.user.id,
      },
    };

    return groupDto;
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    return await this.groupsRepository.save({
      name: createGroupDto.name,
      description: createGroupDto.description,
      teacherId: createGroupDto.teacherId,
      students: createGroupDto.studentsIds.map(
        (id) => ({ id } as unknown as Student),
      ),
    });
  }

  async deleteGroup(id: number) {
    await this.groupsRepository.delete(id);
  }

  async updateGroup(updateGroupDto: UpdateGroupDto) {
    const group = await this.groupsRepository.findOne(updateGroupDto.id);
    group.students = updateGroupDto.studentsIds.map(
      (id) => ({ id } as unknown as Student),
    );
    group.name = updateGroupDto.name;
    group.teacherId = updateGroupDto.teacherId;
    group.description = updateGroupDto.description;
    group.studentsIds = updateGroupDto.studentsIds;

    return await this.groupsRepository.save(group);
  }

  async addStudentToGroup(dto: AddStudentInGroupDto) {
    const group = await this.groupsRepository.findOne(dto.groupId, {
      relations: ['students'],
    });

    const currentStudent = await this.studentsService.getStudentById(
      dto.studentId,
    );
    group.students.map((stud) => {
      if (stud.id == currentStudent.id) {
        throw new HttpException(
          'Ученик уже находится в данной группе!',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    group.students.push(currentStudent);
    await this.groupsRepository.save(group);
  }

  async deleteStudentFromGroup(dto: DeleteStudentFromGroup) {
    const group = await this.groupsRepository.findOne(dto.groupId, {
      relations: ['students'],
    });
    const currentStudent = await this.studentsService.getStudentById(
      dto.studentId,
    );
    await this.connection
      .createQueryBuilder()
      .relation(Group, 'students')
      .of(group)
      .remove(currentStudent);
  }
}
