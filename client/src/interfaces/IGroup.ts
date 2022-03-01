import { IStudent } from './IStudent';

export interface IGroup {
    id: number;
    name: string;
    desc?: string;
    students?: IStudent[];
}
