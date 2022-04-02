import $api from './http';
import { API_URL } from '../constants/urls';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/toastConfig';
import { getErrorMsg } from '../utils/helperFunc';
import { IPageDataResponse } from './responses/types';
import { ILessonType } from '../interfaces/ILessonType';

const getLessonTypes = async (page: number, rowPerPage: number) => {
    const response = await $api
        .get(`${API_URL}/lesson-types`, {
            params: {
                page: page,
                take: rowPerPage,
            },
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        });
    const data: IPageDataResponse<ILessonType> = response?.data;
    console.log(data);
    return data;
};

const createLessonType = async (values: any) => {
    const response = await $api
        .post(`${API_URL}/lesson-types`, {
            name: values.name,
            description: values.description,
            color: values.color,
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

const updateLessonType = async (values: any) => {
    const id = values.id;
    await $api
        .put(`${API_URL}/lesson-types/${id}`, {
            name: values.name,
            description: values.description,
            color: values.color,
        })
        .then(data => {
            if (data.status == 200 || data.status == 204) {
                toast.success('Успешно обновлено!', toastConfig);
            }
        })
        .catch(e => {
            console.log(e);
        });
};

const deleteLessonType = async (id: number) => {
    const response = await $api
        .delete(`${API_URL}/lesson-types/${id}`)
        .then(data => {
            if (data.status == 200 || data.status == 204) {
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

const LessonTypesService = {
    getLessonTypes,
    createLessonType,
    deleteLessonType,
    updateLessonType,
};
export default LessonTypesService;
