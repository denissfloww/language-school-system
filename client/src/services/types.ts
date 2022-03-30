export interface IGroupCreateUpdateValues {
    id?: string;
    name: string;
    description: string;
    studentsIds: number[];
    teacherId: string | number;
}
