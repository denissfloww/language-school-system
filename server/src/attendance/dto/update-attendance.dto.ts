import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { AttendanceMarkEnum } from '../AttendanceMarkEnum';

export class UpdateAttendanceDto {
  @IsEnum(AttendanceMarkEnum)
  attendanceMark: AttendanceMarkEnum;
}
