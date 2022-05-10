import { StudentAttendanceDto } from './student-attendance.dto';

export class GroupStudentAttendanceDto {
  groupId: number;
  groupName: string;
  attendances: StudentAttendanceDto;
}
