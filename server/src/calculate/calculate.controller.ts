import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.calculateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calculateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalculateDto: UpdateCalculateDto) {
    return this.calculateService.update(+id, updateCalculateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calculateService.remove(+id);
  }
}
