import { Injectable, Logger } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ScheduleEvent } from '../models/schedule-event.entity';
import RRule from 'rrule';
import { User } from '../models/user.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEvent)
    private scheduleEventRepository: Repository<ScheduleEvent>,
    @InjectConnection() private connection: Connection,
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
      });
    } else {
      scheduleEventData = await this.scheduleEventRepository.save({
        eventId: createScheduleDto.eventId,
        eventData: createScheduleDto.data,
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

  async getScheduleEvents() {
    const events = await this.scheduleEventRepository
      .createQueryBuilder('event')
      .select(['event.eventData'])
      .getMany();

    return events.map((e) => e.eventData);
  }

  async updateData(param: any) {
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

    // if (
    //   param.action === 'insert' ||
    //   (param.action == 'batch' && param.added.length)
    // ) {
    //   const value = param.action == 'insert' ? param.value : param.added[0];
    //
    //   const lastEvent = await this.scheduleEventRepository.findOne({
    //     order: { id: 'DESC' },
    //   });
    //   let index = 1;
    //   if (lastEvent) {
    //     index = parseInt(lastEvent.id) + 1;
    //   }
    //   value.id = index;
    //   await this.scheduleEventRepository.save({
    //     eventId: index,
    //     eventData: value,
    //   });
    // }

    // if (
    //   param.action == 'update' ||
    //   (param.action == 'batch' && param.changed.length)
    // ) {
    //   const value = param.action == 'update' ? param.value : param.changed[0];
    //   const filterData = await this.scheduleEventRepository.find({
    //     eventId: value.Id,
    //   });
    //   if (filterData.length > 0) {
    //     //ScheduleEventData appointment = db.ScheduleEventDatas.Single(A => A.Id == Convert.ToInt32(value.Id));
    //     const appointment = filterData.find(
    //       (e) => e.eventId == parseInt(value.Id),
    //     );
    //     appointment.eventData.StartTime = value.StartTime;
    //     appointment.eventData.EndTime = value.EndTime;
    //     appointment.eventData.Subject = value.Subject;
    //     appointment.eventData.IsAllDay = value.IsAllDay;
    //     appointment.eventData.RecurrenceRule = value.RecurrenceRule;
    //     appointment.eventData.RecurrenceID = value.RecurrenceID;
    //     appointment.eventData.RecurrenceException = value.RecurrenceException;
    //
    //     appointment.eventData.GroupId = value.GroupId;
    //     appointment.eventData.TeacherId = value.TeacherId;
    //     appointment.eventData.ClassTypeId = value.ClassTypeId;
    //
    //     await this.scheduleEventRepository.save(appointment);
    //   }
    //   //var filterData = db.ScheduleEventDatas.Where(c => c.Id == Convert.ToInt32(value.Id));
    // }

    return await this.getScheduleEvents();
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  async remove(eventId: number) {
    await this.scheduleEventRepository.delete({ eventId: eventId });
    await this.scheduleEventRepository.query(``);
  }
}
