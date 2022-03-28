import { IStudent } from './IStudent';
import { ITeacher } from './ITeacher';

export interface IGroup {
    id: number;
    name: string;
    desc?: string;
    students?: IStudent[];
    teacher: ITeacher;
}
