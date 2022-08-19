import { IStudent } from '../interfaces/IStudent';
import $api from './http';
import { API_URL } from '../constants/urls';
import { IPageDataResponse } from './responses/types';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/toastConfig';
import { getErrorMsg } from '../utils/helperFunc';

const getStudents = async (page?: number, rowPerPage?: number) => {
    const response = await $api
        .get(`${API_URL}/students`, {
            params: {
                page: page ?? null,
                take: rowPerPage ?? null,
            },
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        })
        .then(data => {
            return data;
        });

    const data: IPageDataResponse<IStudent> = response?.data;

    return data.data;
};

const getAllStudentsLight = async () => {
    const response = await $api
        .get(`${API_URL}/students/light`)
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        })
        .then(data => {
            return data;
        });

    const data: IPageDataResponse<IStudent> = response?.data;

    return data.data;
};

const getStudentByUserId = async (userId: number) => {
    const response = await $api.get(`${API_URL}/students/user/${userId}`).catch(e => {
        if (!e.response) {
            toast.error('Connection error', toastConfig);
        } else {
            toast.error(getErrorMsg(e as any), toastConfig);
        }
    });

    return response?.data as IStudent;
};

const getStudentById = async (studentId: number) => {
    const response = await $api.get(`${API_URL}/students/${studentId}`).catch(e => {
        if (!e.response) {
            toast.error('Connection error', toastConfig);
        } else {
            toast.error(getErrorMsg(e as any), toastConfig);
        }
    });

    return response?.data as IStudent;
};

const StudentsService = {
    getStudents,
    getStudentByUserId,
    getStudentById,
    getAllStudentsLight,
};
export default StudentsService;
