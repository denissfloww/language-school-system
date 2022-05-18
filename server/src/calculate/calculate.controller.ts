import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { CreateCalculateDto } from './dto/create-calculate.dto';
import { UpdateCalculateDto } from './dto/update-calculate.dto';

@Controller('calculate')
export class CalculateController {
  constructor(private readonly calculateService: CalculateService) {}

  @Post()
  create(@Body() createCalculateDto: CreateCalculateDto) {
    return this.calculateService.create(createCalculateDto);
  }

  @Get('student/:studentId/groups')
  monthlyStudentCalculateInAllGroups(
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.calculateService.monthlyStudentCalculateInAllGroups(studentId);
  }

  @Get('/email/test')
  findAll() {
    return this.calculateService.findAll();
  }

  @Get('groups')
  async calculateAllGroupsPayment() {
    return this.calculateService.calculateAllGroupsPayment();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calculateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalculateDto: UpdateCalculateDto,
  ) {
    return this.calculateService.update(+id, updateCalculateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calculateService.remove(+id);
  }
}
