export interface IStudentAttendance {
    groupId: number;
    groupName: string;
    attendances: {
        studentId: string;
        studentName: string;
        attendances: {
            id?: number;
            date: string;
            result: string;
        }[];
    };
}
