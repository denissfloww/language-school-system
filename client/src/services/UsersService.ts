import { IUser, RoleTypes } from '../interfaces/IUser';

const getUsers = () => {
    const users: IUser[] = [
        {
            id: 1,
            firstName: 'Денис',
            lastName: 'Денис',
            middleName: 'Денис',
            role: RoleTypes.Admin,
        },
    ];

    return users;
};

const StudentsService = {
    getUsers,
};
export default StudentsService;
