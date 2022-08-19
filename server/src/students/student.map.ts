import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { mapFrom, mapWith } from '@automapper/core';
import { Student } from '../models/student.entity';
import { StudentDto } from './dto/students.dto';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../models/user.entity';
import { GroupDto } from '../group/dto/group.dto';
import { Group } from '../models/group.entity';

@Injectable()
export class StudentProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper
        .createMap(Student, StudentDto)
        .forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id),
        )
        .forMember(
          (destination) => destination.firstName,
          mapFrom((source) => source.user.firstName),
        )
        .forMember(
          (destination) => destination.middleName,
          mapFrom((source) => source.user.middleName),
        )
        .forMember(
          (destination) => destination.lastName,
          mapFrom((source) => source.user.lastName),
        )
        .forMember(
          (destination) => destination.userId,
          mapFrom((source) => source.user.id),
        )
        .forMember(
          (destination) => destination.parentName,
          mapFrom((source) => source.parentName),
        )
        .forMember(
          (destination) => destination.parentMiddleName,
          mapFrom((source) => source.parentMiddleName),
        )
        .forMember(
          (destination) => destination.parentLastName,
          mapFrom((source) => source.parentLastName),
        )
        .forMember(
          (destination) => destination.parentEmail,
          mapFrom((source) => source.parentEmail),
        )
        .forMember(
          (destination) => destination.parentPhone,
          mapFrom((source) => source.parentPhone),
        )
        .forMember(
          (destination) => destination.user,
          mapWith(UserDto, User, (source) => source.user),
        )
        .forMember(
          (destination) => destination.groups,
          mapWith(GroupDto, Group, (source) => source.groups),
        );
    };
  }
}
