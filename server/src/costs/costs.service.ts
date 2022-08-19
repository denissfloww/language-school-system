import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cost } from '../models/cost.entity';
import { GroupService } from '../group/group.service';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CostStudentGroup } from '../models/cost.student.group.entity';

@Injectable()
export class CostsService extends TypeOrmCrudService<Cost> {
  constructor(
    @InjectRepository(Cost)
    private costRepository: Repository<Cost>,
    @InjectRepository(CostStudentGroup)
    private costStudentGroupRepository: Repository<CostStudentGroup>,
    @Inject(forwardRef(() => GroupService))
    private groupService: GroupService,
  ) {
    super(costRepository);
  }

  async getGroupCost(groupId: number) {
    const group = await this.groupService.getGroupById(groupId);
    return group.cost;
  }

  async getCostByStudentAndGroup(groupId: number, studentId: number) {
    const costStudentGroup = await this.costStudentGroupRepository.findOne({
      where: { groupId: groupId, studentId: studentId },
      relations: ['cost'],
    });

    return costStudentGroup?.cost;
  }
}
