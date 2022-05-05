export interface IAttendance {
    studentName: string;
    attendances: { id?: number; date: string; result: AttendanceEnum }[];
}

export enum AttendanceEnum {
    Attended = 'attended',
    Absent = 'absent',
    GoodAbsent = 'goodAbsent',
    None = '',
}

export let AttendanceEnumDisplay: { [index: string]: string } = {};
AttendanceEnumDisplay[AttendanceEnum.None] = '';
AttendanceEnumDisplay[AttendanceEnum.Attended] = 'П';
AttendanceEnumDisplay[AttendanceEnum.Absent] = 'Н';
AttendanceEnumDisplay[AttendanceEnum.GoodAbsent] = 'Ну';
