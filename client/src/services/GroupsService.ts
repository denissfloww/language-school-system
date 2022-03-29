import { IGroupCreateUpdateValues } from '../redux/reducers/groups/types';
import { IGroup } from '../interfaces/IGroup';
import axios from 'axios';
import { API_URL } from '../urls';
import { IPageDataResponse } from './responses/types';

const getGroups = async (page: number, rowPerPage: number) => {
    const response = await axios.get(`${API_URL}/group`, {
        params: {
            page: page,
            take: rowPerPage,
        },
    });
    const data: IPageDataResponse<IGroup> = response.data;
    return data;
};

const createGroup = (values: any) => {
    const studentIds: number[] = values.students.map((student: any) => {
        return parseInt(student.value);
    });

    const createValues: IGroupCreateUpdateValues = {
        name: values.name,
        desc: values.desc,
        studentIds: studentIds,
        id: values.id,
    };
    console.log(createValues);
};

const getGroupById = async (id: number) => {
    const response = await axios.get(`${API_URL}/group/${id}`)

    return response.data;
};

const GroupsService = {
    getGroups,
    createGroup,
    getGroupById,
};
export default GroupsService;
