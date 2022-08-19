import $api from './http';
import { API_URL } from '../constants/urls';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/toastConfig';
import { getErrorMsg } from '../utils/helperFunc';

const getStudentTests = async (page?: number, limit?: number) => {
    const response = await $api
        .get(`${API_URL}/tests`, {
            params: {
                page: page ?? null,
                limit: limit ?? null,
            },
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        });

    return response?.data;
};

const getTestById = async (testId: number) => {
    const response = await $api.get(`${API_URL}/tests/${testId}`).catch(e => {
        if (!e.response) {
            toast.error('Connection error', toastConfig);
        } else {
            toast.error(getErrorMsg(e as any), toastConfig);
        }
    });

    return response?.data;
};

const createTest = async (values: any) => {
    const response = await $api
        .post(`${API_URL}/tests`, {
            ...values,
        })
        .then(data => {
            if (data.status == 200 || data.status == 204 || data.status == 201) {
                toast.success('Успешно добавлено!', toastConfig);
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

const deleteTest = async (testId: number) => {
    const response = await $api
        .delete(`${API_URL}/tests/${testId}`)
        .then(data => {
            if (data.status == 200 || data.status == 204 || data.status == 201) {
                toast.success('Успешно удалено!', toastConfig);
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

const updateTest = async (testId: number, values: any) => {
    const response = await $api
        .patch(`${API_URL}/tests/${testId}`, {
            ...values,
        })
        .then(data => {
            if (data.status == 200 || data.status == 204 || data.status == 201) {
                toast.success('Успешно обновлено!', toastConfig);
            }

            return data;
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        });

    return response?.data;
};

const StudentTestsService = { getStudentTests, createTest, getTestById, updateTest, deleteTest };

export default StudentTestsService;
