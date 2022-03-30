import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { mapFrom } from '@automapper/core';
import { Student } from '../models/student.entity';
import { StudentDto } from './dto/students.dto';

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
        );
    };
  }
}
