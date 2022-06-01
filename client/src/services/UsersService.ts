import { IUser } from '../interfaces/IUser';
import { IChangePasswordDto, ICreatedUser, ICreateUserData } from '../redux/reducers/users/types';
import $api from './http';
import { API_URL } from '../constants/urls';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/toastConfig';
import { getErrorMsg } from '../utils/helperFunc';
import { IPageDataResponse } from './responses/types';

const getUsers = async (page?: number, rowPerPage?: number) => {
    const response = await $api
        .get(`${API_URL}/users`, {
            params: {
                page: page ?? null,
                take: rowPerPage ?? null,
            },
        })
        .then(data => {
            return data;
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        });
    const data: IPageDataResponse<IUser> = response?.data;
    return data;
};

const getUserById = async (userId: number) => {
    const response = await $api
        .get(`${API_URL}/users/${userId}`)
        .then(data => {
            return data;
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        });
    const data: IUser = response?.data;
    return data;
};

const createUser = async (user: ICreateUserData) => {
    const response = await $api.post('/users', {
        ...user,
    });
    const createdUser: ICreatedUser = response.data;
    return createdUser;
};

const updateUser = async (userId: number, values: any) => {
    const updateValues = {
        birthDate: values.birthDate,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: values.middleName,
        parentEmail: values.parentEmail,
        parentLastName: values.parentLastName,
        parentMiddleName: values.parentMiddleName,
        parentName: values.parentName,
        parentPhone: values.parentPhone,
        phone: values.phone,
    };
    const response = await $api
        .put(`${API_URL}/users/${userId}`, {
            ...updateValues,
        })
        .then(data => {
            if (data.status == 200 || data.status == 204) {
                toast.success('Успешно обновлено!', toastConfig);
            }
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        });
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

const UsersService = {
    getUsers,
    createUser,
    changePassword,
    updateUser,
    getUserById,
};
export default UsersService;
