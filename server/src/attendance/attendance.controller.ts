import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { PutAttendanceDto } from './dto/put-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('/group/:groupId')
  getGroupAttendances(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.attendanceService.getGroupAttendance(groupId);
  }

  @Get('/student/:studentId')
  getStudentAttendancesFromAllGroups(
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.attendanceService.getStudentAttendanceFromAllGroups(studentId);
  }

  @Post()
  async putAttendance(@Body() putAttendanceDto: PutAttendanceDto) {
    await this.attendanceService.putAttendance(
      putAttendanceDto.studentId,
      putAttendanceDto.groupId,
      putAttendanceDto.eventDate,
      putAttendanceDto.attendanceMark,
    );
  }

  @Put(':id')
  async updateAttendance(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    await this.attendanceService.updateAttendance(
      id,
      updateAttendanceDto.attendanceMark,
    );
  }
}
