import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Headers,
  Logger,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private jwtService: JwtService,
  ) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  findAll() {
    return this.scheduleService.getAllScheduleEvents();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/loadData')
  loadSchedulerData(@Headers() headers) {
    const jwtToken = headers['authorization'].split(' ')[1];
    const userJwtInfo = this.jwtService.decode(jwtToken);
    const userId = userJwtInfo['id'];
    return this.scheduleService.getScheduleEventsForUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/updateData')
  async updateSchedulerData(@Body() data: any, @Headers() headers) {
    const jwtToken = headers['authorization'].split(' ')[1];
    const userJwtInfo = this.jwtService.decode(jwtToken);
    const userId = userJwtInfo['id'];
    return await this.scheduleService.updateData(data, userId);
  }

  @Get('/test')
  async test() {
    return await this.scheduleService.getScheduleEventsForUser(3);
  }

  @Get('/events/group/:id')
  getEventsForGroup(@Param('id', ParseIntPipe) id: number) {
    return this.scheduleService.getEventsByGroup(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.scheduleService.remove(+id);
  }
}
