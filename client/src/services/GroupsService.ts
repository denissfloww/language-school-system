import { IGroup } from '../interfaces/IGroup';
import { API_URL } from '../urls';
import { IPageDataResponse } from './responses/types';
import $api from './http';
import { IGroupCreateUpdateValues } from './types';
import { toast } from 'react-toastify';
import { getErrorMsg } from '../utils/helperFunc';
import { toastConfig } from '../utils/toastConfig';

const getGroups = async (page: number, rowPerPage: number) => {
    const response = await $api
        .get(`${API_URL}/group`, {
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
    const data: IPageDataResponse<IGroup> = response?.data;
    return data;
};

const createGroup = async (values: any) => {
    const studentsIds: number[] = values.students.map((student: any) => {
        return parseInt(student.value);
    });

    const createValues: IGroupCreateUpdateValues = {
        name: values.name,
        description: values.desc,
        studentsIds: studentsIds,
        id: values.id,
        teacherId: Number(values.teacher),
    };

    const response = await $api
        .post(`${API_URL}/group`, {
            ...createValues,
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        });
};

const updateGroup = async (values: any) => {
    const studentsIds: number[] = values.students.map((student: any) => {
        return Number(student.value);
    });

    const updateValues: IGroupCreateUpdateValues = {
        name: values.name,
        description: values.desc,
        studentsIds: studentsIds,
        id: values.id,
        teacherId: Number(values.teacher),
    };

    const response = await $api
        .put(`${API_URL}/group`, {
            ...updateValues,
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        });
};

const getGroupById = async (id: number) => {
    const response = await $api.get(`${API_URL}/group/${id}`).catch(e => {
        if (!e.response) {
            toast.error('Connection error', toastConfig);
        } else {
            toast.error(getErrorMsg(e as any), toastConfig);
        }
    });

    return response?.data;
};

const deleteGroup = async (id: number) => {
    const response = await $api.delete(`${API_URL}/group/${id}`).catch(e => {
        if (!e.response) {
            toast.error('Connection error', toastConfig);
        } else {
            toast.error(getErrorMsg(e as any), toastConfig);
        }
    });
};

const GroupsService = {
    getGroups,
    createGroup,
    getGroupById,
    updateGroup,
    deleteGroup,
};
export default GroupsService;
