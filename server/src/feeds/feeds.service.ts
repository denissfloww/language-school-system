import { Injectable } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from '../models/feed.entity';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { PageDto } from '../common/dtos/page.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { NotFoundException } from '../exceptions/not-found.exception';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { FeedDto } from './dto/feed.dto';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(Feed)
    private feedRepository: Repository<Feed>,
    @InjectMapper() private blahMapper: Mapper,
  ) {}

  async create(createFeedDto: CreateFeedDto, userId: number) {
    return await this.feedRepository.save({
      ...createFeedDto,
      userId: userId,
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const skip =
      (Number(pageOptionsDto.page) - 1) * Number(pageOptionsDto.take);

    const [list, count] = await this.feedRepository.findAndCount({
      relations: ['user'],
      order: {
        createdAt: pageOptionsDto.order,
      },
      take: pageOptionsDto.take,
      skip: skip,
    });

    const pageMetaDto = new PageMetaDto({ itemCount: count, pageOptionsDto });

    const feedDtos = this.blahMapper.mapArray(list, FeedDto, Feed);

    return new PageDto(feedDtos, pageMetaDto);
  }

  async findOne(id: number) {
    const feed = await this.feedRepository.findOne(id);

    if (feed) {
      return feed;
    }

    throw new NotFoundException();
  }

  async update(id: number, updateFeedDto: UpdateFeedDto) {
    const feed = await this.feedRepository.findOne(id);

    if (feed) {
      await this.feedRepository.update(id, {
        ...updateFeedDto,
      });

      return;
    }

    throw new NotFoundException();
  }

  async remove(id: number) {
    const feed = await this.feedRepository.findOne(id);

    if (feed) {
      await this.feedRepository.remove(feed);

      return;
    }

    throw new NotFoundException();
  }
}
