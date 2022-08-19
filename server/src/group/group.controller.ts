import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { DeleteStudentFromGroup } from './dto/delete-student-from-group';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
export class GroupController {
  constructor(private groupsService: GroupService) {}

  @Get()
  getGroups(@Query() pageOptionsDto: PageOptionsDto) {
    return this.groupsService.getGroups(pageOptionsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getGroup(@Param('id', ParseIntPipe) id: number) {
    return await this.groupsService.getGroupById(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  async getUserGroups(@Param('userId', ParseIntPipe) userId: number) {
    return await this.groupsService.getUserGroups(userId);
  }

  @Get('/student/:studentId')
  async getStudentGroups(@Param('studentId', ParseIntPipe) studentId: number) {
    return await this.groupsService.getStudentGroupsDtos(studentId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.createGroup(createGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateGroup(@Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.updateGroup(updateGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete('/:id')
  async deleteGroup(@Param('id', ParseIntPipe) id: number) {
    await this.groupsService.deleteGroup(id);
  }
}
