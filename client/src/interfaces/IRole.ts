export interface IRole {
    id: number | string;
    name: RoleTypes;
    label: string;
    description: string;
}

export enum RoleTypes {
    None,
    Admin = 'admin',
    Student = 'student',
    Teacher = 'teacher',
}

export function allRoles() {
    return [RoleTypes.Student, RoleTypes.Teacher, RoleTypes.Admin];
}

export let RoleTypesDisplay: { [index: string]: string } = {};
RoleTypesDisplay[RoleTypes.None] = 'None';
RoleTypesDisplay[RoleTypes.Admin] = 'Администратор';
RoleTypesDisplay[RoleTypes.Student] = 'Ученик';
RoleTypesDisplay[RoleTypes.Teacher] = 'Учитель';
