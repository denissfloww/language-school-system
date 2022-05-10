import { RoleTypes } from './IRole';

export interface IUser {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    role: RoleTypes;
    password?: string;
    birthDate: Date;
    phone?: string;
    email?: string;
    student?: {
        parentName: string;
        parentMiddleName?: string;
        parentLastName: string;
        parentEmail: string;
        parentPhone: string;
    };
}
