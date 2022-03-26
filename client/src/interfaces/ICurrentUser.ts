import { IRole } from "./IRole";

export interface ICurrentUser {
    id: number;
    login: string;
    firstName?: string;
    lastName?: string;
    roles: IRole[];
}
