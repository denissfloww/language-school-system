import { RoleTypes } from '../../../interfaces/IRole';

export interface ICreateUserData {
    firstName: string;
    lastName: string;
    middleName?: string;
    roles: RoleTypes[];
    phone: string;
    email: string;
    parentEmail: string;
    parentLastName: string;
    parentMiddleName: string;
    parentName: string;
    parentPhone: string;
}

export interface ICreatedUser {
    id: number;
    login: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    password: string;
    phone: string;
    email: string;
    roles: RoleTypes[];
}
