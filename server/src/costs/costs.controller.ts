import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CostsService } from './costs.service';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';

@Controller('costs')
export class CostsController {
  constructor(private readonly costsService: CostsService) {}

  @Post()
  create(@Body() createCostDto: CreateCostDto) {
    return this.costsService.create(createCostDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.costsService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.costsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCostDto: UpdateCostDto,
  ) {
    return this.costsService.update(+id, updateCostDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.costsService.remove(+id);
  }
}
