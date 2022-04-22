import { Injectable } from '@nestjs/common';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { PageDto } from '../common/dtos/page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cost } from '../models/cost.entity';
import { NotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class CostsService {
  constructor(
    @InjectRepository(Cost)
    private costRepository: Repository<Cost>,
  ) {}

  async create(createCostDto: CreateCostDto) {
    return await this.costRepository.save({
      ...createCostDto,
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const skip =
      (Number(pageOptionsDto.page) - 1) * Number(pageOptionsDto.take);

    const [list, count] = await this.costRepository.findAndCount({
      order: {
        createdAt: pageOptionsDto.order,
      },
      take: pageOptionsDto.take,
      skip: skip,
    });

    const pageMetaDto = new PageMetaDto({ itemCount: count, pageOptionsDto });
    return new PageDto(list, pageMetaDto);
  }

  async findOne(id: number) {
    const cost = await this.costRepository.findOne(id);

    if (cost) {
      return cost;
    }

    throw new NotFoundException();
  }

  async update(id: number, updateCostDto: UpdateCostDto) {
    const cost = await this.costRepository.findOne(id);

    if (cost) {
      await this.costRepository.update(id, {
        ...updateCostDto,
      });

      return;
    }

    throw new NotFoundException();
  }

  async remove(id: number) {
    const cost = await this.costRepository.findOne(id);

    if (cost) {
      await this.costRepository.remove(cost);

      return;
    }

    throw new NotFoundException();
  }
}
