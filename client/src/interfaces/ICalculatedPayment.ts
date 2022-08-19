import { IStudent } from './IStudent';
import { IGroup } from './IGroup';

export interface ICalculatedPayment {
    id: number;
    paymentSum: number;
    calculationMonth: number;
    calculationDate: Date;
    student: IStudent;
    group: IGroup;
}
