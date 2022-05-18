import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper, mapWith } from '@automapper/core';
import { UserDto } from '../dto/user.dto';
import { User } from '../../models/user.entity';
import { RoleDto } from '../../roles/dto/role.dto';
import { Role } from '../../models/role.entity';

export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper
        .createMap(User, UserDto)
        .forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id),
        )
        .forMember(
          (destination) => destination.firstName,
          mapFrom((source) => source.firstName),
        )
        .forMember(
          (destination) => destination.middleName,
          mapFrom((source) => source.middleName),
        )
        .forMember(
          (destination) => destination.lastName,
          mapFrom((source) => source.lastName),
        )
        .forMember(
          (destination) => destination.email,
          mapFrom((source) => source.email),
        )
        .forMember(
          (destination) => destination.birthDate,
          mapFrom((source) => source.birthDate),
        )
        .forMember(
          (destination) => destination.phone,
          mapFrom((source) => source.phone),
        )
        .forMember(
          (destination) => destination.student?.parentName,
          mapFrom((source) => source.student?.parentName),
        )
        .forMember(
          (destination) => destination.student?.parentMiddleName,
          mapFrom((source) => source.student?.parentMiddleName),
        )
        .forMember(
          (destination) => destination.student?.parentLastName,
          mapFrom((source) => source.student?.parentLastName),
        )
        .forMember(
          (destination) => destination.student?.parentEmail,
          mapFrom((source) => source.student?.parentEmail),
        )
        .forMember(
          (destination) => destination.student?.parentPhone,
          mapFrom((source) => source.student?.parentPhone),
        )
        .forMember(
          (destination) => destination.roles,
          mapWith(RoleDto, Role, (source) => source.roles),
        );
    };
  }
}
