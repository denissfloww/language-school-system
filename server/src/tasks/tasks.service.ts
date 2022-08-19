import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ConfigService } from '@nestjs/config';
import { CalculateService } from '../calculate/calculate.service';
import { MailerService } from '@nestjs-modules/mailer';
import moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { CalculatedPayment } from '../models/calculated.payment.entity';
import { Repository } from 'typeorm';
import { GroupCalculateDto } from '../calculate/dto/group-calculate.dto';

@Injectable()
export class TasksService implements OnModuleInit {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private configService: ConfigService,
    private calculateService: CalculateService,
    private readonly mailerService: MailerService,
    @InjectRepository(CalculatedPayment)
    private calculatedPaymentRepository: Repository<CalculatedPayment>,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  onModuleInit() {
    const firstCalculateJob = new CronJob(
      this.configService.get<string>('PRE_MONTH_CALCULATE_CRON'),
      async () => {
        await this.monthlyCalculateAndSendEmails();
      },
    );

    this.schedulerRegistry.addCronJob(
      'first_monthly_calculate',
      firstCalculateJob,
    );
    firstCalculateJob.start();

    const secondCalculateJob = new CronJob(
      this.configService.get<string>('MONTH_CALCULATE_CRON'),
      async () => {
        await this.monthlyCalculateAndSendEmails();
      },
    );

    this.schedulerRegistry.addCronJob('monthly_calculate', secondCalculateJob);
    secondCalculateJob.start();
  }

  async monthlyCalculateAndSendEmails() {
    const payments = await this.calculateService.calculateAllGroupsPayment();

    for (const groupPayment of payments) {
      for (const studentPayment of groupPayment.studentPrices) {
        await this.saveCalculatedPayment(
          studentPayment.payment,
          groupPayment.nextMonthPayDigit,
          studentPayment.studentId,
          groupPayment.groupId,
        );

        if (this.isSendActive) {
          await this.sendParentEmail(
            studentPayment.parentEmail,
            studentPayment.parentName,
            studentPayment.parentMiddleName,
            groupPayment.groupName,
            groupPayment.nextMonthPay,
            String(studentPayment.payment),
          );
        }
      }
    }
  }

  async sendParentsEmail(payments: GroupCalculateDto[]) {
    if (this.isSendActive) {
      for (const groupPayment of payments) {
        for (const studentPayment of groupPayment.studentPrices) {
          await this.sendParentEmail(
            studentPayment.parentEmail,
            studentPayment.parentName,
            studentPayment.parentMiddleName,
            groupPayment.groupName,
            groupPayment.nextMonthPay,
            String(studentPayment.payment),
          );
        }
      }
    }
  }

  get isSendActive(): boolean {
    return this.configService.get('SEND_EMAIL_MONTHLY_CALCULATE') === 'true';
  }

  async sendTestEmail() {
    if (this.isSendActive) {
      Logger.debug(1);
      await this.sendParentEmail(
        'denbugackoff21@gmail.com',
        'Ольга',
        'Васильевна',
        'Англ 3 класс',
        'июль',
        '5600',
      );
    }
  }

  async saveCalculatedPayment(
    paymentSum: number,
    calculationMonth: number,
    studentId: number,
    groupId: number,
  ) {
    await this.calculatedPaymentRepository.save({
      paymentSum: paymentSum,
      calculationMonth: calculationMonth,
      studentId: studentId,
      groupId: groupId,
    });
  }

  async sendParentEmail(
    parentEmail: string,
    parentName: string,
    parentMiddleName: string,
    groupName: string,
    nextMonthPay: string,
    payment: string,
  ) {
    const schoolName = this.configService.get<string>('SCHOOL_NAME');
    const schoolAddress = this.configService.get<string>('SCHOOL_ADDRESS');
    const schoolContactPhone = this.configService.get<string>(
      'SCHOOL_CONTACT_PHONE',
    );
    const clientLink = this.configService.get<string>('CLIENT_LINK');

    this.mailerService
      .sendMail({
        to: parentEmail,
        from: this.configService.get<string>('EMAIL_ID'),
        subject: this.configService.get<string>('EMAIL_SUBJECT'),
        template: 'index',
        context: {
          schoolName: schoolName,
          schoolAddress: schoolAddress,
          schoolContactPhone: schoolContactPhone,
          parentName: parentName,
          parentMiddleName: parentMiddleName,
          groupName: groupName,
          nextMonthPay: nextMonthPay,
          payment: payment,
          appLink: clientLink,
          year: moment().year().toString(),
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
