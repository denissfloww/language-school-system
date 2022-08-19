import moment from 'moment';

export class CalculateDateAndMonthDto {
  endDate: moment.Moment;
  month: string;
  startDate: moment.Moment;
}
