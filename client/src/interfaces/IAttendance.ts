export interface IAttendance {
    studentId: number;
    studentName: string;
    attendances: { id?: number; date: string; result: AttendanceEnum }[];
}

export enum AttendanceEnum {
    Attended = 'attended',
    Absent = 'absent',
    GoodAbsent = 'goodAbsent',
    None = '',
}

export const AttendanceType = [
    { id: AttendanceEnum.Attended, title: 'П', value: 'П', text: 'П' },
    { id: AttendanceEnum.Absent, title: 'Н', value: 'Н', text: 'Н' },
    { id: AttendanceEnum.GoodAbsent, title: 'Ну', value: 'Ну', text: 'Ну' },
];

export let AttendanceEnumDisplay: { [index: string]: string } = {};
AttendanceEnumDisplay[AttendanceEnum.None] = '';
AttendanceEnumDisplay[AttendanceEnum.Attended] = 'П';
AttendanceEnumDisplay[AttendanceEnum.Absent] = 'Н';
AttendanceEnumDisplay[AttendanceEnum.GoodAbsent] = 'Ну';

