import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from '../models/feed.entity';
import { UsersModule } from '../users/users.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { User } from '../models/user.entity';
import { FeedProfile } from './mappings/feed.map';

@Module({
  imports: [TypeOrmModule.forFeature([Feed, User]), UsersModule],
  controllers: [FeedsController],
  providers: [FeedsService, FeedProfile],
})
export class FeedsModule {}
