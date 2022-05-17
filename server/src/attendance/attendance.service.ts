import { forwardRef, Inject, Injectable } from '@nestjs/common';
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
import { GroupStudentAttendanceDto } from './dto/group-student-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @Inject(forwardRef(() => StudentsService))
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
    const attendance = await this.attendanceRepository.findOne({
      where: {
        eventDate: eventDate,
        groupId: groupId,
        studentId: studentId,
      },
    });
    if (attendance) {
      attendance.attendanceMark = attendanceMark;
      await this.attendanceRepository.save(attendance);
    } else {
      await this.attendanceRepository.save({
        eventDate: eventDate,
        groupId: groupId,
        studentId: studentId,
        attendanceMark: attendanceMark,
      });
    }
  }

  async getStudentAttendanceFromAllGroups(studentId: number) {
    const student = await this.studentsService.getStudentById(studentId);
    const attendances: GroupStudentAttendanceDto[] = [];
    for (const group of student.groups) {
      const events = await this.scheduleService.getEventsByGroup(group.id);
      const studentAttendance = await this.getStudentAttendanceInGroup(
        {
          id: student.id,
          firstName: student.user.firstName,
          lastName: student.user.lastName,
        },
        group.id,
        events,
      );

      attendances.push({
        groupId: group.id,
        groupName: group.name,
        attendances: studentAttendance,
      });
    }

    return attendances;
  }

  async updateAttendance(
    attendanceId: number,
    attendanceMark: AttendanceMarkEnum,
  ) {
    const attendance = await this.attendanceRepository.findOne({
      where: { id: String(attendanceId) },
    });
    if (attendance) {
      attendance.attendanceMark = attendanceMark;
      return await this.attendanceRepository.save(attendance);
    }

    throw new NotFoundException();
  }

  async getStudentGroupAttendanceEntities(
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

  async getStudentAttendacesByGroupId(studentId: number, groupId: number) {
    const student = await this.studentsService.getStudentById(studentId);
    const events = await this.scheduleService.getEventsByGroup(groupId);

    return await this.getStudentAttendanceInGroup(
      {
        id: student.id,
        firstName: student.user.firstName,
        lastName: student.user.lastName,
      },
      groupId,
      events,
    );
  }

  async getStudentAttendanceInGroup(
    student: { id: number; lastName: string; firstName: string },
    groupId: number,
    events: Date[],
  ) {
    const studentAttendances = await this.getStudentGroupAttendanceEntities(
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
      studentId: String(student.id),
      studentName: `${student.lastName} ${student.firstName[0]}`,
      attendances: attendanceArray,
    };
    return studentAttendance;
  }

  async getGroupAttendance(groupId: number) {
    const students = await this.studentsService.getStudentsByGroupId(groupId);

    const events = await this.scheduleService.getEventsByGroup(groupId);

    const attendances: StudentAttendanceDto[] = [];

    for (const student of students) {
      const studentAttendance = await this.getStudentAttendanceInGroup(
        {
          id: Number(student.id),
          firstName: student.firstName,
          lastName: student.lastName,
        },
        groupId,
        events,
      );

      attendances.push(studentAttendance);
    }

    return attendances;
  }
}
