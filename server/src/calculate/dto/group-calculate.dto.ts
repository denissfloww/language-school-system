import StudentPaymentDto from './student-payment.dto';

export class GroupCalculateDto {
  studentPrices: StudentPaymentDto[];
  futureMonthDate: Date[];
  nextMonthPay: string;
  nextMonthPayDigit: number;
  groupName: string;
  groupId: number;
}
