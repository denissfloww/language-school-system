export interface IUser {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    role: RoleTypes;
}

export interface IRole {
    name: RoleTypes;
    desc: string;
}

export enum RoleTypes {
    None,
    Admin = 'Admin',
    student = 'student',
    Teacher = 'Teacher',
}

export let RoleTypesDisplay: { [index: string]: string } = {};
RoleTypesDisplay[RoleTypes.None] = 'None';
RoleTypesDisplay[RoleTypes.Admin] = 'Администратор';
RoleTypesDisplay[RoleTypes.student] = 'Ученик';
RoleTypesDisplay[RoleTypes.Teacher] = 'Учитель';
