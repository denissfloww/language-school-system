import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Feed } from '../../models/feed.entity';
import { FeedDto } from '../dto/feed.dto';
import { mapFrom } from '@automapper/core';

@Injectable()
export class FeedProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper
        .createMap(Feed, FeedDto)
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
          (destination) => destination.data,
          mapFrom((source) => source.data),
        )
        .forMember(
          (destination) => destination.createdAt,
          mapFrom((source) => source.createdAt),
        )
        .forMember(
          (destination) => destination.createdUser.firstName,
          mapFrom((source) => source.user.firstName),
        )
        .forMember(
          (destination) => destination.createdUser.middleName,
          mapFrom((source) => source.user.middleName),
        )
        .forMember(
          (destination) => destination.createdUser.lastName,
          mapFrom((source) => source.user.lastName),
        );
    };
  }
}
