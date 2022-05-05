import { AttendanceMarkEnum } from '../AttendanceMarkEnum';

export class StudentAttendanceDto {
  studentName: string;
  attendances: {
    id?: number;
    date: Date;
    result: AttendanceMarkEnum;
  }[];
}
