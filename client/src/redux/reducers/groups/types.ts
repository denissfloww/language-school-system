export interface IStudentAutoCompleteValue {
    label: string;
    value: string;
}

export interface IGroupCreateUpdateValues {
    id?: string
    name: string;
    desc: string;
    studentIds: number[];
}
