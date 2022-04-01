import { IStudent } from '../interfaces/IStudent';
import $api from './http';
import { API_URL } from '../constants/urls';
import { IPageDataResponse } from './responses/types';

const getStudents = async () => {
    const response = await $api.get(`${API_URL}/students`);
    const data: IPageDataResponse<IStudent> = response.data;

    return data.data;
};

const StudentsService = {
    getStudents,
};
export default StudentsService;
