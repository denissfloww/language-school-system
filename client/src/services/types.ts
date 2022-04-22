export interface IGroupCreateUpdateValues {
    id?: string;
    name: string;
    description: string;
    studentsIds: number[];
    teacherId: string | number;
    languageId: string | number;
    costId: string | number;
}
