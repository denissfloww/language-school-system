import { IUser } from '../interfaces/IUser';
import axios from 'axios';
import { API_URL } from '../urls';
import { ICreatedUser, ICreateUserData } from '../redux/reducers/users/types';
import { RoleTypes } from '../interfaces/IRole';
import $api from './http';

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

const createUser = async (user: ICreateUserData) => {
    console.log(user);

    const response = await $api.post('/users', {
        ...user,
    });

    const createdUser: ICreatedUser = response.data;

    return createdUser;
};

const StudentsService = {
    getUsers,
    createUser,
};
export default StudentsService;
