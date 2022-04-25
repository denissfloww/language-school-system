import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Headers,
  Put,
} from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { UsersService } from '../users/users.service';

@Controller('feeds')
export class FeedsController {
  constructor(
    private readonly feedsService: FeedsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createFeedDto: CreateFeedDto, @Headers() headers) {
    const userId = await this.usersService.getUserIdFromHeader(headers);
    return this.feedsService.create(createFeedDto, userId);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.feedsService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.feedsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFeedDto: UpdateFeedDto,
  ) {
    return this.feedsService.update(+id, updateFeedDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.feedsService.remove(+id);
  }
}
