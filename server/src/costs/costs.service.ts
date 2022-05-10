import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { PageDto } from '../common/dtos/page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cost } from '../models/cost.entity';
import { NotFoundException } from '../exceptions/not-found.exception';
import { GroupService } from '../group/group.service';
import { UsersService } from "../users/users.service";

@Injectable()
export class CostsService {
  constructor(
    @InjectRepository(Cost)
    private costRepository: Repository<Cost>,
    @Inject(forwardRef(() => GroupService))
    private groupService: GroupService,
  ) {}

  async create(createCostDto: CreateCostDto) {
    return await this.costRepository.save({
      ...createCostDto,
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const skip =
      (Number(pageOptionsDto.page) - 1) * Number(pageOptionsDto.take);

    const [costs, count] = await this.costRepository.findAndCount({
      order: {
        createdAt: pageOptionsDto.order,
      },
      take: pageOptionsDto.take,
      skip: isNaN(skip) ? undefined : skip,
    });

    const pageMetaDto = new PageMetaDto({ itemCount: count, pageOptionsDto });
    return new PageDto(costs, pageMetaDto);
  }

  async findOne(id: number) {
    const cost = await this.costRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (cost) {
      return cost;
    }

    throw new NotFoundException();
  }

  async update(id: number, updateCostDto: UpdateCostDto) {
    const cost = await this.costRepository.findOne({
      where: { id: String(id) },
    });

    if (cost) {
      await this.costRepository.update(id, {
        ...updateCostDto,
      });

      return;
    }

    throw new NotFoundException();
  }

  async getGroupCost(groupId: number) {
    const group = await this.groupService.getGroupById(groupId);
    return group.cost;
  }

  async remove(id: number) {
    const cost = await this.costRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (cost) {
      await this.costRepository.remove(cost);

      return;
    }

    throw new NotFoundException();
  }
}
