export interface IStudentAutoCompleteValue {
    label: string;
    value: string;
}

export interface IAutoCompleteValues {
    label: string;
    value: string;
}

export interface ILessonTypeForSchedule {
    Id: number;
    Color: string;
    Name: string;
}

export interface IGroupForSchedule {
    Id: number;
    Name: string;
    TeacherName: string;
}
