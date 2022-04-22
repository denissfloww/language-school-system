import { IStudent } from './IStudent';
import { ITeacher } from './ITeacher';
import { ILanguage } from './ILanguage';
import { ICost } from './ICost';

export interface IGroup {
    id: number;
    name: string;
    description?: string;
    students?: IStudent[];
    teacher: ITeacher;
    language: ILanguage;
    cost: ICost;
}
