import {
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
} from 'class-validator';
import { AttendanceMarkEnum } from '../AttendanceMarkEnum';

export class PutAttendanceDto {
  @IsNotEmpty()
  @IsInt()
  studentId: number;

  @IsNotEmpty()
  @IsInt()
  groupId: number;

  @IsDateString()
  eventDate: Date;

  @IsEnum(AttendanceMarkEnum)
  attendanceMark: AttendanceMarkEnum;
}
