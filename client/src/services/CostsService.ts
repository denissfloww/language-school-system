import $api from './http';
import { API_URL } from '../constants/urls';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/toastConfig';
import { getErrorMsg } from '../utils/helperFunc';
import { INewPageDataResponse, IPageDataResponse } from './responses/types';
import { ICost, ICostStudentGroupId } from '../interfaces/ICost';

const getCosts = async (page?: number, limit?: number) => {
    const response = await $api
        .get(`${API_URL}/costs`, {
            params: {
                page: page ?? null,
                limit: limit ?? null,
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
    const data: INewPageDataResponse<ICost> = response?.data;
    return data;
};

const getCostStudentGroup = async (id: number) => {
    const response = await $api
        .get(`${API_URL}/costs/student/group/${id}`)
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

    return response?.data as ICostStudentGroupId;
};

const deleteCost = async (id: number) => {
    const response = await $api
        .delete(`${API_URL}/costs/${id}`)
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

const updateCost = async (values: any) => {
    const id = values.id;
    await $api
        .put(`${API_URL}/costs/${id}`, {
            name: values.name,
            description: values.description,
            lessonPrice: values.lessonPrice,
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

const saveCostStudentGroup = async (values: any) => {
    const response = await $api
        .post(`${API_URL}/costs/student/group/create`, {
            groupId: Number(values.groupId),
            costId: Number(values.costId),
            studentId: Number(values.studentId),
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

const updateCostStudentGroup = async (values: any) => {
    const response = await $api
        .post(`${API_URL}/costs/student/group/update`, {
            costStudentGroupId: values.costStudentGroupId,
            costId: Number(values.costId),
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

const createCost = async (values: any) => {
    const response = await $api
        .post(`${API_URL}/costs`, {
            name: values.name,
            description: values.description,
            lessonPrice: values.lessonPrice,
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

const CostsService = {
    getCosts,
    createCost,
    updateCost,
    deleteCost,
    getCostStudentGroup,
    saveCostStudentGroup,
    updateCostStudentGroup,
};
export default CostsService;
