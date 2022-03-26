import { RoleTypes } from "./IRole";

export interface IUser {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    role: RoleTypes;
    password?: string;
}
