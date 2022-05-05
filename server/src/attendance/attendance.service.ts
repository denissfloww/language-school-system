import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Attendance } from '../models/attendance.entity';
import { StudentsService } from '../students/students.service';
import { ScheduleService } from '../schedule/schedule.service';
import { StudentAttendanceDto } from './dto/student-attendance.dto';
import { AttendanceMarkEnum } from './AttendanceMarkEnum';
import moment from 'moment';
import { NotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    private studentsService: StudentsService,
    private scheduleService: ScheduleService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async putAttendance(
    studentId: number,
    groupId: number,
    eventDate: Date,
    attendanceMark: AttendanceMarkEnum,
  ) {
    await this.attendanceRepository.save({
      eventDate: eventDate,
      groupId: groupId,
      studentId: studentId,
      attendanceMark: attendanceMark,
    });
  }

  async updateAttendance(
    attendanceId: number,
    attendanceMark: AttendanceMarkEnum,
  ) {
    const attendance = await this.attendanceRepository.findOne(attendanceId);
    if (attendance) {
      attendance.attendanceMark = attendanceMark;
      return await this.attendanceRepository.save(attendance);
    }

    throw new NotFoundException();
  }

  async getStudentAttendanceByGroupId(
    studentId: number | string,
    groupId: number,
  ) {
    const attendances = await this.attendanceRepository
      .createQueryBuilder('attendance')
      .where('attendance.groupId = :groupId', { groupId: groupId })
      .andWhere('attendance.studentId = :studentId', { studentId: studentId })
      .getMany();

    return attendances;
  }

  async getGroupAttendance(groupId: number) {
    const students = await this.studentsService.getStudentsByGroupId(groupId);

    const events = await this.scheduleService.getEventsByGroup(groupId);

    const attendances: StudentAttendanceDto[] = [];

    for (const student of students) {
      const studentAttendances = await this.getStudentAttendanceByGroupId(
        student.id,
        groupId,
      );

      const attendanceArray: {
        id?: number;
        date: Date;
        result: AttendanceMarkEnum;
      }[] = [];

      for (const event of events) {
        const results = studentAttendances.filter((attendance) =>
          moment(event).isSame(attendance.eventDate),
        );

        if (results.length) {
          for (const res of results) {
            attendanceArray.push({
              id: +res.id,
              date: event,
              result: res.attendanceMark,
            });
          }
        } else {
          attendanceArray.push({
            date: event,
            result: AttendanceMarkEnum.None,
          });
        }
      }

      const studentAttendance: StudentAttendanceDto = {
        studentName: `${student.lastName} ${student.firstName[0]}`,
        attendances: attendanceArray,
      };

      attendances.push(studentAttendance);
    }

    return attendances;
  }
}
