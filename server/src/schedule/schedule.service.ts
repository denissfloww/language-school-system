import { Injectable, Logger } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ScheduleEvent } from '../models/schedule-event.entity';
import RRule, { RRuleSet } from 'rrule';
import moment from 'moment';
import { Group } from '../models/group.entity';
import { StudentsService } from '../students/students.service';
import { UsersService } from '../users/users.service';
import { RolesEnum } from '../auth/roles.enum';
import { TeacherService } from '../teacher/teacher.service';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEvent)
    private scheduleEventRepository: Repository<ScheduleEvent>,
    private userService: UsersService,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectConnection() private connection: Connection,
    private studentsService: StudentsService,
    private teachersService: TeacherService,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const existEvent = await this.scheduleEventRepository.findOne({
      eventId: createScheduleDto.eventId,
    });
    let scheduleEventData;
    if (existEvent) {
      scheduleEventData = await this.scheduleEventRepository.save({
        id: existEvent.id,
        eventId: createScheduleDto.eventId,
        eventData: createScheduleDto.data,
        groupId: createScheduleDto.data.GroupId,
      });
    } else {
      scheduleEventData = await this.scheduleEventRepository.save({
        eventId: createScheduleDto.eventId,
        eventData: createScheduleDto.data,
        groupId: createScheduleDto.data.GroupId,
      });
    }

    Logger.log(createScheduleDto.data.RecurrenceRule);
    if (createScheduleDto.data.RecurrenceRule) {
      const options = RRule.parseString(createScheduleDto.data.RecurrenceRule);
      options.dtstart = new Date(createScheduleDto.data.StartTime);
      const rule = new RRule(options);
      return rule.all();
      // Logger.log(rule.all());
    }

    return scheduleEventData;
  }

  async getAllScheduleEvents() {
    const events = await this.scheduleEventRepository
      .createQueryBuilder('event')
      .select(['event.eventData'])
      .getMany();

    return events.map((e) => e.eventData);
  }

  async getScheduleEventsForUser(userId: number) {
    const user = await this.userService.getUserById(userId);
    if (user.roles.some((role) => role.name == RolesEnum.Admin)) {
      return await this.getAllScheduleEvents();
    } else {
      let studentEventsData = [];
      let teacherEventsData = [];
      if (user.roles.some((role) => role.name == RolesEnum.Student)) {
        studentEventsData = await this.getStudentEvents(userId);
      }
      if (user.roles.some((role) => role.name == RolesEnum.Teacher)) {
        teacherEventsData = await this.getTeacherEvents(userId);
      }

      return [...studentEventsData, ...teacherEventsData];
    }
  }

  async getStudentEvents(userId: number) {
    const student = await this.studentsService.getStudentByUserId(userId);

    const eventsResult: ScheduleEvent[] = [];

    for (const group of student.groups) {
      const events = await this.scheduleEventRepository
        .createQueryBuilder('event')
        .where(`event.event_data->>'GroupId' = :GroupId`, {
          GroupId: group.id,
        })
        .select('event.eventData')
        .getMany();

      events.map((e) => {
        eventsResult.push(e.eventData);
      });
    }

    return eventsResult;
  }

  async getTeacherEvents(userId: number) {
    const teacher = await this.teachersService.getTeacherByUserId(userId);

    const eventsResult: ScheduleEvent[] = [];

    for (const group of teacher.groups) {
      const events = await this.scheduleEventRepository
        .createQueryBuilder('event')
        .where(`event.event_data->>'GroupId' = :GroupId`, {
          GroupId: group.id,
        })
        .select('event.eventData')
        .getMany();

      events.map((e) => {
        eventsResult.push(e.eventData);
      });
    }

    return eventsResult;
  }

  async updateData(param: any, userId: number) {
    await this.connection.transaction(async (manager) => {
      if (
        param.action === 'insert' ||
        (param.action == 'batch' && param.added.length)
      ) {
        const value = param.action == 'insert' ? param.value : param.added[0];

        const lastEvent = await manager.findOne<ScheduleEvent>(ScheduleEvent, {
          order: { id: 'DESC' },
        });
        let index = 1;
        if (lastEvent) {
          index = lastEvent.eventId + 1;
        }
        value.Id = index;
        const event = new ScheduleEvent();
        event.eventId = index;
        event.eventData = value;
        event.groupId = value.GroupId;
        await manager.save<ScheduleEvent>(event);
      }

      if (
        param.action == 'update' ||
        (param.action == 'batch' && param.changed.length)
      ) {
        const value = param.action == 'update' ? param.value : param.changed[0];
        const filterData = await manager.find<ScheduleEvent>(ScheduleEvent, {
          eventId: value.Id,
        });
        if (filterData.length > 0) {
          const appointment = filterData.find(
            (e) => e.eventId == parseInt(value.Id),
          );
          appointment.eventData.StartTime = value.StartTime;
          appointment.eventData.EndTime = value.EndTime;
          appointment.eventData.Subject = value.Subject;
          appointment.eventData.IsAllDay = value.IsAllDay;
          appointment.eventData.RecurrenceRule = value.RecurrenceRule;
          appointment.eventData.RecurrenceID = value.RecurrenceID;
          appointment.eventData.RecurrenceException = value.RecurrenceException;

          appointment.eventData.GroupId = value.GroupId;
          appointment.eventData.TeacherId = value.TeacherId;
          appointment.eventData.ClassTypeId = value.ClassTypeId;

          appointment.groupId = value.GroupId;

          await manager.save<ScheduleEvent>(appointment);
        }
      }

      if (
        param.action == 'remove' ||
        (param.action == 'batch' && param.deleted.length)
      ) {
        if (param.action == 'remove') {
          const key = param.key;
          //ScheduleEventData appointment = db.ScheduleEventDatas.Where(c => c.Id == key).FirstOrDefault();
          const appointment = await manager.findOne<ScheduleEvent>(
            ScheduleEvent,
            {
              eventId: key,
            },
          );

          if (appointment) {
            await manager.remove<ScheduleEvent>(ScheduleEvent, appointment);
          }
        } else {
          for (const apps of param.deleted) {
            const appointment = await manager.findOne<ScheduleEvent>(
              ScheduleEvent,
              {
                eventId: apps.Id,
              },
            );

            await manager.remove<ScheduleEvent>(ScheduleEvent, appointment);
          }
        }
      }
    });

    return await this.getScheduleEventsForUser(userId);
  }


  async getEventsByGroup(groupId: number) {
    const scheduleEvents = await this.scheduleEventRepository.find({
      where: { groupId: groupId },
    });

    const rruleSet = new RRuleSet();

    for (const event of scheduleEvents) {
      if (!event.eventData.RecurrenceID) {
        if (event.eventData.RecurrenceRule) {
          const options = RRule.parseString(
            event.eventData.RecurrenceRule.slice(0, -1),
          );
          options.dtstart = new Date(event.eventData.StartTime);
          const rule = new RRule(options);
          rruleSet.rrule(rule);
          if (event.eventData.RecurrenceException) {
            const exDates = event.eventData.RecurrenceException.split(',');
            for (const date of exDates) {
              rruleSet.exdate(moment(date).toDate());
            }
          }
        } else {
          rruleSet.rdate(moment(event.eventData.StartTime).toDate());
        }
      } else {
        rruleSet.rdate(moment(event.eventData.StartTime).toDate());
      }
    }

    return rruleSet.all();
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  async remove(eventId: number) {
    await this.scheduleEventRepository.delete({ eventId: eventId });
    await this.scheduleEventRepository.query(``);
  }
}
