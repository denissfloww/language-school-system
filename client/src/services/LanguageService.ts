import { API_URL } from '../constants/urls';
import { INewPageDataResponse } from './responses/types';
import $api from './http';
import { ILanguage } from '../interfaces/ILanguage';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/toastConfig';
import { getErrorMsg } from '../utils/helperFunc';

const getLanguages = async (page?: number, limit?: number) => {
    const response = await $api
        .get(`${API_URL}/languages`, {
            params: {
                page: page ?? null,
                take: limit ?? null,
            },
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        });

    const data: INewPageDataResponse<ILanguage> = response?.data;
    return data;
};

const deleteLanguage = async (id: number) => {
    const response = await $api
        .delete(`${API_URL}/languages/${id}`)
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

const updateLanguage = async (values: any) => {
    const id = values.id;
    await $api
        .put(`${API_URL}/languages/${id}`, {
            name: values.name,
            description: values.description,
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

const createLanguage = async (values: any) => {
    const response = await $api
        .post(`${API_URL}/languages`, {
            name: values.name,
            description: values.description,
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

const LanguageService = {
    getLanguages,
    deleteLanguage,
    updateLanguage,
    createLanguage,
};
export default LanguageService;
