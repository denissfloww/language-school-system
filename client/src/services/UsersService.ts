import { IUser } from '../interfaces/IUser';
import { IChangePasswordDto, ICreatedUser, ICreateUserData } from '../redux/reducers/users/types';
import { RoleTypes } from '../interfaces/IRole';
import $api from './http';
import { API_URL } from '../constants/urls';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/toastConfig';
import { getErrorMsg } from '../utils/helperFunc';

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

const changePassword = async (dto: IChangePasswordDto) => {
    await $api
        .put(`${API_URL}/users/change/password`, {
            ...dto,
        })
        .then(data => {
            if (data.status == 200 || data.status == 204 || data.status == 201) {
                toast.success('Пароль успешно обновлен!', toastConfig);
            }
        })
        .catch(e => {
            // if (!e.response) {
            //     toast.error('Connection error', toastConfig);
            // } else {
            //     toast.error(getErrorMsg(e as any), toastConfig);
            // }
        });
};

const StudentsService = {
    getUsers,
    createUser,
    changePassword,
};
export default StudentsService;
