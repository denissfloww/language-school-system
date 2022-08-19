import { AttendanceMarkEnum } from '../AttendanceMarkEnum';

export class StudentAttendanceDto {
  studentName: string;
  studentLastName: string;
  parentName: string;
  parentMiddleName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  studentId: string;
  attendances: {
    id?: number;
    date: Date;
    result: AttendanceMarkEnum;
  }[];
}
