import $api from './http';
import { API_URL } from '../constants/urls';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/toastConfig';
import { getErrorMsg } from '../utils/helperFunc';
import { IAttendance } from '../interfaces/IAttendance';

const getGroupAttendance = async (groupId: number) => {
    const response = await $api.get(`${API_URL}/attendance/group/${groupId}`).catch(e => {
        if (!e.response) {
            toast.error('Connection error', toastConfig);
        } else {
            toast.error(getErrorMsg(e as any), toastConfig);
        }
    });

    return response?.data as IAttendance[];
};

const JournalService = {
    getGroupAttendance,
};
export default JournalService;
