import $api from './http';
import { API_URL } from '../constants/urls';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/toastConfig';
import { getErrorMsg } from '../utils/helperFunc';
import { AttendanceEnum, IAttendance } from "../interfaces/IAttendance";

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

const putAttendance = async (studentId: number, groupId: number, eventDate: string, attendanceMark: AttendanceEnum) => {
    const response = await $api
      .post(`${API_URL}/attendance`, {
          groupId: groupId,
          studentId: studentId,
          eventDate: eventDate,
          attendanceMark: attendanceMark,
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

const JournalService = {
    getGroupAttendance,
    putAttendance
};
export default JournalService;
