import { IGroup } from './IGroup';
import { ITest } from './ITest';
import { IStudent } from './IStudent';

export interface IReport {
    createdAt: string;
    id: number;
    reportDate: string;
    group: IGroup;
    test?: ITest;
    testScored?: number;
    description: string;
    student: IStudent;
}
