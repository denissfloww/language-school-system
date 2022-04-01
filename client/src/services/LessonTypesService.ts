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
    return data;
};

const createLessonType = async (values: any) => {
    const response = await $api
        .post(`${API_URL}/lesson-types`, {
            name:values.name,
            description: values.description,
            color: values.color
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        });
}

const LessonTypesService = {
    getLessonTypes,
    createLessonType
};
export default LessonTypesService;
