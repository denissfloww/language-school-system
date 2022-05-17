import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCalculateDto } from './dto/create-calculate.dto';
import { UpdateCalculateDto } from './dto/update-calculate.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ScheduleService } from '../schedule/schedule.service';
import moment from 'moment';
import { AttendanceService } from '../attendance/attendance.service';
import { AttendanceMarkEnum } from '../attendance/AttendanceMarkEnum';
import { GroupService } from '../group/group.service';
import { CostsService } from '../costs/costs.service';
import { StudentsService } from '../students/students.service';
import { ConfigService } from '@nestjs/config';
import { CalculateDateAndMonthDto } from './dto/calculate-date-and-month.dto';

@Injectable()
export class CalculateService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly scheduleService: ScheduleService,
    private readonly attendanceService: AttendanceService,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
    private readonly costService: CostsService,
    @Inject(forwardRef(() => StudentsService))
    private readonly studentService: StudentsService,
    private configService: ConfigService,
  ) {}
  create(createCalculateDto: CreateCalculateDto) {
    return 'This action adds a new calculate';
  }

  async calculateAllGroupsPayment() {
    const groups = await this.groupService.getGroupIds();
    const result = [];
    for (const group of groups) {
      const groupCalculate = await this.monthlyGroupCalculate(+group.id);
      result.push(groupCalculate);
    }

    return result;
  }

  async monthlyStudentCalculateInAllGroups(studentId: number) {
    const groups = await this.groupService.getStudentGroups(studentId);

    const results = [];
    for (const group of groups) {
      const price = await this.monthlyStudentCalculateByGroup(
        studentId,
        group.id,
      );

      const calculateDateDto = await this.getCalculateDateAndMonth();

      results.push({
        groupId: group.id,
        groupName: group.name,
        price: price,
        month: calculateDateDto.month,
      });
    }

    return results;
  }

  async monthlyStudentCalculateByGroup(studentId: number, groupId: number) {
    const events = await this.scheduleService.getEventsByGroup(groupId);

    const student = await this.studentService.getStudentById(studentId);

    const studentAttendance =
      await this.attendanceService.getStudentAttendanceInGroup(
        {
          id: Number(student.id),
          firstName: student.user.firstName,
          lastName: student.user.lastName,
        },
        groupId,
        events,
      );

    const calculateDateDto = await this.getCalculateDateAndMonth();
    const futureMonthDate = await CalculateService.getDatesArrayForPeriod(
      calculateDateDto.endDate,
      calculateDateDto.futureMonthDate,
      events,
    );
    const cost = await this.costService.getGroupCost(groupId);
    let priceNextMonth = cost.lessonPrice * futureMonthDate.length;
    for (const attendance of studentAttendance.attendances) {
      if (attendance.result == AttendanceMarkEnum.GoodAbsent) {
        const calculatedPrice = priceNextMonth - cost.lessonPrice;
        if (calculatedPrice < 0) {
          priceNextMonth = 0;
        } else {
          priceNextMonth = calculatedPrice;
        }
      }
    }

    return { priceNextMonth, calculateMonth: calculateDateDto.month };
  }

  async getCalculateDateAndMonth() {
    const endDate = moment().date(
      this.configService.get<number>('MONTH_CALCULATE_DAY'),
    );

    const futureMonthDate = moment(endDate).add(1, 'months');

    const month = futureMonthDate.format('M');

    const dto: CalculateDateAndMonthDto = {
      endDate: endDate,
      month: month,
      futureMonthDate: futureMonthDate,
    };
    return dto;
  }

  async monthlyGroupCalculate(groupId: number) {
    const events = await this.scheduleService.getEventsByGroup(groupId);
    const attendances = await this.attendanceService.getGroupAttendance(
      groupId,
    );

    const calculateDateDto = await this.getCalculateDateAndMonth();

    const cost = await this.costService.getGroupCost(groupId);
    const lessonPrice = cost.lessonPrice;

    const futureMonthDate = await CalculateService.getDatesArrayForPeriod(
      calculateDateDto.endDate,
      calculateDateDto.futureMonthDate,
      events,
    );

    const studentPrices: { name: string; payment: number }[] = [];

    for (const studentAttendance of attendances) {
      let priceNextMonth = lessonPrice * futureMonthDate.length;
      for (const attendance of studentAttendance.attendances) {
        if (attendance.result == AttendanceMarkEnum.GoodAbsent) {
          const calculatedPrice = priceNextMonth - lessonPrice;
          if (calculatedPrice < 0) {
            priceNextMonth = 0;
          } else {
            priceNextMonth = calculatedPrice;
          }
        }
      }

      studentPrices.push({
        name: studentAttendance.studentName,
        payment: priceNextMonth,
      });
    }

    return { studentPrices, futureMonthDate };
  }

  private static async getDatesArrayForPeriod(
    startDate: moment.Moment,
    endDate: moment.Moment,
    dates: Date[],
  ) {
    const periodDates: Date[] = [];
    for (const event of dates) {
      if (moment(event).isBetween(startDate, endDate)) {
        periodDates.push(event);
      }
    }

    return periodDates;
  }

  findAll() {
    this.mailerService
      .sendMail({
        to: 'denbugackoff21@gmail.com',
        from: 'denisbugackoff@yandex.ru',
        subject: 'Тест',
        template: 'index',
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findOne(id: number) {
    return `This action updates a #${id} calculate`;
  }

  update(id: number, updateCalculateDto: UpdateCalculateDto) {
    return `This action updates a #${id} calculate`;
  }

  remove(id: number) {
    return `This action removes a #${id} calculate`;
  }
}
