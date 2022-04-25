export interface IFeed {
    id: string | number;
    name: string;
    description: string;
    data: string;
    createdAt: Date;
    updatedAt: Date;
    createdUser?: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
}
