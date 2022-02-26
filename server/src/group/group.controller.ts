import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { DeleteGroupDto } from './dto/delete-group.dto';
import { AddStudentInGroupDto } from './dto/add-student-in-group.dto';
import { DeleteStudentFromGroup } from './dto/delete-student-from-group';

@Controller('group')
export class GroupController {
  constructor(private groupsService: GroupService) {}

  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.createGroup(createGroupDto);
  }

  @HttpCode(204)
  @Delete()
  deleteGroup(@Body() deleteGroupDto: DeleteGroupDto) {
    return this.groupsService.deleteGroup(deleteGroupDto.id);
  }

  @Post('/add/student')
  addStudentInGroup(@Body() dto: AddStudentInGroupDto) {
    return this.groupsService.addStudentToGroup(dto);
  }

  @HttpCode(204)
  @Delete('/delete/student')
  deleteStudentFromGroup(@Body() dto: DeleteStudentFromGroup) {
    return this.groupsService.deleteStudentFromGroup(dto);
  }
}
