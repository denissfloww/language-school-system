import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Group } from '../../models/group.entity';
import { GroupDto } from '../dto/group.dto';
import { mapFrom, mapWith } from '@automapper/core';
import { Student } from '../../models/student.entity';
import { StudentDto } from '../../students/dto/students.dto';

@Injectable()
export class GroupProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper
        .createMap(Group, GroupDto)
        .forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id),
        )
        .forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name),
        )
        .forMember(
          (destination) => destination.description,
          mapFrom((source) => source.description),
        )
        .forMember(
          (destination) => destination.teacher.id,
          mapFrom((source) => source.teacher.id),
        )
        .forMember(
          (destination) => destination.teacher.firstName,
          mapFrom((source) => source.teacher.user.firstName),
        )
        .forMember(
          (destination) => destination.teacher.middleName,
          mapFrom((source) => source.teacher.user.middleName),
        )
        .forMember(
          (destination) => destination.teacher.lastName,
          mapFrom((source) => source.teacher.user.lastName),
        )
        .forMember(
          (destination) => destination.teacher.userId,
          mapFrom((source) => source.teacher.user.id),
        )
        .forMember(
          (destination) => destination.teacher.email,
          mapFrom((source) => source.teacher.user.email),
        )
        .forMember(
          (destination) => destination.teacher.phone,
          mapFrom((source) => source.teacher.user.phone),
        )
        .forMember(
          (destination) => destination.language.id,
          mapFrom((source) => source.language.id),
        )
        .forMember(
          (destination) => destination.language.name,
          mapFrom((source) => source.language.name),
        )
        .forMember(
          (destination) => destination.language.description,
          mapFrom((source) => source.language.description),
        )
        .forMember(
          (destination) => destination.cost.id,
          mapFrom((source) => source.cost.id),
        )
        .forMember(
          (destination) => destination.cost.name,
          mapFrom((source) => source.cost.name),
        )
        .forMember(
          (destination) => destination.cost.description,
          mapFrom((source) => source.cost.description),
        )
        .forMember(
          (destination) => destination.cost.lessonPrice,
          mapFrom((source) => source.cost.lessonPrice),
        )
        .forMember(
          (destination) => destination.students,
          mapWith(StudentDto, Student, (source) => source.students),
        );
    };
  }
}
