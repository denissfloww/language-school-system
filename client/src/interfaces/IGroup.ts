import { IStudent } from './IStudent';
import { ITeacher } from './ITeacher';
import { ILanguage } from './ILanguage';

export interface IGroup {
    id: number;
    name: string;
    description?: string;
    students?: IStudent[];
    teacher: ITeacher;
    language: ILanguage;
}
