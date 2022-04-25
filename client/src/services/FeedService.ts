import $api from './http';
import { API_URL } from '../constants/urls';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/toastConfig';
import { getErrorMsg } from '../utils/helperFunc';
import { IPageDataResponse } from './responses/types';
import { IFeed } from '../interfaces/IFeed';
import { Order } from './types';

const getFeeds = async (page?: number, rowPerPage?: number, order: Order = Order.ASC) => {
    const response = await $api
        .get(`${API_URL}/feeds`, {
            params: {
                page: page ?? null,
                take: rowPerPage ?? null,
                order: order,
            },
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        });

    const data: IPageDataResponse<IFeed> = response?.data;
    return data;
};

const getFeed = async (id: number) => {
    const response = await $api.get(`${API_URL}/feeds/${id}`).catch(e => {
        if (!e.response) {
            toast.error('Connection error', toastConfig);
        } else {
            toast.error(getErrorMsg(e as any), toastConfig);
        }
    });

    const data: IFeed = response?.data;
    return data;
};

const createFeed = async (values: any) => {
    const response = await $api
        .post(`${API_URL}/feeds`, {
            name: values.name,
            description: values.description,
            data: values.data,
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

const updateFeed = async (values: any) => {
    const id = values.id;
    await $api
        .put(`${API_URL}/feeds/${id}`, {
            name: values.name,
            description: values.description,
            data: values.data,
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

const deleteFeed = async (id: number) => {
    const response = await $api
        .delete(`${API_URL}/feeds/${id}`)
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

const FeedsService = {
    getFeeds,
    createFeed,
    updateFeed,
    getFeed,
    deleteFeed,
};
export default FeedsService;
