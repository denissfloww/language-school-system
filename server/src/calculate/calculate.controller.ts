import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CalculateService } from './calculate.service';

@Controller('calculate')
export class CalculateController {
  constructor(private readonly calculateService: CalculateService) {}

  @Get('student/:studentId/groups')
  monthlyStudentCalculateInAllGroups(
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.calculateService.monthlyStudentCalculateInAllGroups(studentId);
  }

  @Get('groups')
  async calculateAllGroupsPayment() {
    return this.calculateService.calculateAllGroupsPayment();
  }
}
