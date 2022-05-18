import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper, MappingProfile } from '@automapper/core';
import { User } from '../../models/user.entity';
import { UserDto } from '../../users/dto/user.dto';
import { Role } from '../../models/role.entity';
import { RoleDto } from '../dto/role.dto';

export class RoleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      mapper
        .createMap(Role, RoleDto)
        .forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id),
        )
        .forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name),
        )
        .forMember(
          (destination) => destination.label,
          mapFrom((source) => source.label),
        );
    };
  }
}
