import { IUser } from './IUser';
import { ICost } from './ICost';

export interface IStudent {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    userId: number;
    parentName: string;
    parentMiddleName: string;
    parentLastName: string;
    parentEmail: string;
    parentPhone: string;
    user: IUser;
    groupsPayment: {
        groupId: number;
        groupName: string;
        price: {
            priceNextMonth: number;
            calculateMonth: string;
        };
        month: string;
        cost: ICost;
        costStudentGroupId: number;
    }[];
}
