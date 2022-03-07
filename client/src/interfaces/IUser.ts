export interface IUser {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    role: RoleTypes;
}

export enum RoleTypes {
    None,
    Admin,
    Student,
    Teacher,
}

export let RoleTypesDisplay: { [index: number]: string } = {};
RoleTypesDisplay[RoleTypes.None] = 'None';
RoleTypesDisplay[RoleTypes.Admin] = 'Администратор';
RoleTypesDisplay[RoleTypes.Student] = 'Ученик';
RoleTypesDisplay[RoleTypes.Teacher] = 'Учитель';
