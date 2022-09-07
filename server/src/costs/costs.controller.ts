import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CostsService } from './costs.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Cost } from '../models/cost.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesEnum } from '../auth/roles.enum';
import { SaveCostStudentGroupDto } from './dto/save-cost-student-group';
import { UpdateCostStudentGroupDto } from './dto/update-cost-student-group';

@Crud({
  model: {
    type: Cost,
  },
  query: {
    alwaysPaginate: true,
    sort: [
      {
        field: 'id',
        order: 'ASC',
      },
    ],
  },
})
@Controller('costs')
export class CostsController implements CrudController<Cost> {
  constructor(public service: CostsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.Admin)
  @Post('/student/group/create')
  saveCostStudentGroup(
    @Body() saveCostStudentGroupDto: SaveCostStudentGroupDto,
  ) {
    return this.service.saveCostStudentGroup(
      saveCostStudentGroupDto.groupId,
      saveCostStudentGroupDto.studentId,
      saveCostStudentGroupDto.costId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.Admin)
  @Post('/student/group/update')
  updateCostStudentGroup(
    @Body() updateCostStudentGroupDto: UpdateCostStudentGroupDto,
  ) {
    return this.service.updateCostStudentGroup(
      updateCostStudentGroupDto.costStudentGroupId,
      updateCostStudentGroupDto.costId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.Admin)
  @Get('/student/group/:id')
  getCostStudentGroupById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getCostStudentGroupById(id);
  }
}
