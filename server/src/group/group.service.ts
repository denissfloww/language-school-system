import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Group } from '../models/group.entity';
import { AddStudentInGroupDto } from './dto/add-student-in-group.dto';
import { StudentsService } from '../students/students.service';
import { DeleteStudentFromGroup } from './dto/delete-student-from-group';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    private studentsService: StudentsService,
    private connection: Connection,
  ) {}

  async createGroup(createGroupDto: CreateGroupDto) {
    const group = await this.groupsRepository.save({
      name: createGroupDto.name,
      description: createGroupDto.description,
    });

    return group;
  }

  async deleteGroup(id: number) {
    await this.groupsRepository.delete(id);
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
