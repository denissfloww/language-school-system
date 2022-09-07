import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
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
import { StudentAttendanceDto } from '../attendance/dto/student-attendance.dto';
import StudentPaymentDto from './dto/student-payment.dto';
import { GroupCalculateDto } from './dto/group-calculate.dto';
import { Cost } from '../models/cost.entity';

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
  async calculateAllGroupsPayment() {
    const groups = await this.groupService.getGroupIds();
    const result: GroupCalculateDto[] = [];
    for (const group of groups) {
      const groupCalculate: GroupCalculateDto = {
        ...(await this.monthlyGroupCalculate(+group.id)),
        groupName: group.name,
      };
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

      const costStudentGroup = await this.costService.getCostStudentGroup(
        group.id,
        studentId,
      );

      const calculateDateDto = await this.getFutureMonthPeriod();

      results.push({
        groupId: group.id,
        groupName: group.name,
        price: price,
        month: calculateDateDto.month,
        cost: costStudentGroup?.cost,
        costStudentGroupId: costStudentGroup?.id,
      });
    }

    return results;
  }

  async monthlyStudentCalculateByGroup(studentId: number, groupId: number) {
    const events = await this.scheduleService.getEventsByGroup(groupId);
    const student = await this.studentService.getStudentById(studentId);
    const studentAttendance =
      await this.attendanceService.getStudentAttendanceInGroup(
        student,
        groupId,
        events,
      );

    const calculateDateDto = await this.getFutureMonthPeriod();
    const futureMonthDate = await CalculateService.getDatesArrayForPeriod(
      calculateDateDto.startDate,
      calculateDateDto.endDate,
      events,
    );

    const previousDateDto = await this.getPrevMonthPeriod();
    const previousMonthDates = await CalculateService.getDatesArrayForPeriod(
      previousDateDto.startDate,
      previousDateDto.endDate,
      events,
    );

    const cost = await this.costService.getCost(groupId, studentId);

    if (!cost) {
      return;
    }

    const currentDateDto = await this.getCurrentMonthPeriod();
    const currentMonthDates = await CalculateService.getDatesArrayForPeriod(
      currentDateDto.startDate,
      currentDateDto.endDate,
      events,
    );

    const priceNextMonth = await this.getPriceByStudentAttendance(
      cost.lessonPrice,
      futureMonthDate,
      currentMonthDates,
      studentAttendance,
    );

    const priceCurrMonthCalculated = await this.getPriceByStudentAttendance(
      cost.lessonPrice,
      currentMonthDates,
      previousMonthDates,
      studentAttendance,
    );

    return {
      previousMonthDates,
      priceCurrMonthCalculated,
      currentMonthDates,
      priceNextMonth,
      futureMonthDate,
      calculateMonth: calculateDateDto.month,
    };
  }

  async getPriceByStudentAttendance(
    lessonPrice: number,
    futureMonthDates: Date[],
    currentMonthDates: Date[],
    studentAttendance: StudentAttendanceDto,
  ) {
    let priceNextMonth = lessonPrice * futureMonthDates.length;
    for (const date of currentMonthDates) {
      const attendance = studentAttendance.attendances.find((a) => {
        return moment(a.date).isSame(date);
      });

      if (attendance.result == AttendanceMarkEnum.GoodAbsent) {
        const calculatedPrice = priceNextMonth - lessonPrice;
        if (calculatedPrice < 0) {
          priceNextMonth = 0;
        } else {
          priceNextMonth = calculatedPrice;
        }
      }
    }

    return priceNextMonth;
  }

  async getFutureMonthPeriod() {
    const startDate = moment().date(
      this.configService.get<number>('MONTH_CALCULATE_DAY'),
    );
    startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    const endDate = moment(startDate).add(1, 'months');
    endDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    const month = endDate.format('M');

    const dto: CalculateDateAndMonthDto = {
      startDate: startDate,
      month: month,
      endDate: endDate,
    };
    return dto;
  }

  async getPrevMonthPeriod() {
    const startDate = moment()
      .date(this.configService.get<number>('MONTH_CALCULATE_DAY'))
      .subtract(1, 'months');
    const endDate = moment(startDate).subtract(1, 'months');
    startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    endDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    const month = endDate.format('M');

    const dto: CalculateDateAndMonthDto = {
      endDate: startDate,
      month: month,
      startDate: endDate,
    };
    return dto;
  }

  async getCurrentMonthPeriod() {
    const endDate = moment().date(
      this.configService.get<number>('MONTH_CALCULATE_DAY'),
    );
    endDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    const startDate = moment(endDate).subtract(1, 'months');
    startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    const month = startDate.format('M');

    const dto: CalculateDateAndMonthDto = {
      startDate: startDate,
      month: month,
      endDate: endDate,
    };
    return dto;
  }

  async monthlyGroupCalculate(groupId: number) {
    const events = await this.scheduleService.getEventsByGroup(groupId);
    const attendances = await this.attendanceService.getGroupAttendance(
      groupId,
    );

    const calculateDateDto = await this.getFutureMonthPeriod();

    const cost = await this.costService.getGroupCost(groupId);
    const lessonPrice = cost.lessonPrice;

    const futureMonthDate = await CalculateService.getDatesArrayForPeriod(
      calculateDateDto.startDate,
      calculateDateDto.endDate,
      events,
    );

    const currentDateDto = await this.getCurrentMonthPeriod();
    const currentMonthDates = await CalculateService.getDatesArrayForPeriod(
      currentDateDto.startDate,
      currentDateDto.endDate,
      events,
    );

    const studentPrices: StudentPaymentDto[] = [];
    for (const studentAttendance of attendances) {
      const priceNextMonth = await this.getPriceByStudentAttendance(
        lessonPrice,
        futureMonthDate,
        currentMonthDates,
        studentAttendance,
      );

      studentPrices.push({
        parentEmail: studentAttendance.parentEmail,
        parentLastName: studentAttendance.parentLastName,
        parentMiddleName: studentAttendance.parentMiddleName,
        parentName: studentAttendance.parentName,
        parentPhone: studentAttendance.parentPhone,
        studentLastName: studentAttendance.studentLastName,
        studentId: Number(studentAttendance.studentId),
        studentName: studentAttendance.studentName,
        payment: priceNextMonth,
      });
    }

    return {
      studentPrices,
      futureMonthDate,
      nextMonthPay: moment()
        .locale('ru')
        .month(calculateDateDto.month)
        .subtract(1, 'month')
        .format('MMMM'),
      nextMonthPayDigit: Number(calculateDateDto.month),
      groupId: groupId,
    };
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
}
