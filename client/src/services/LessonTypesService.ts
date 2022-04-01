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

const LessonTypesService = {
    getLessonTypes,
};
export default LessonTypesService;
