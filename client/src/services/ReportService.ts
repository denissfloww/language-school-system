import $api from './http';
import { API_URL } from '../constants/urls';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/toastConfig';
import { getErrorMsg } from '../utils/helperFunc';
import { IReport } from '../interfaces/IReport';
import { INewPageDataResponse } from './responses/types';

const getReports = async () => {
    const response = await $api.get(`${API_URL}/reports`).then(data => {
        return data;
    });

    const data: INewPageDataResponse<IReport> = response?.data;
    return data;
};

const getReportsByStudentId = async (studentId: number) => {
    const response = await $api
        .get(`${API_URL}/reports/student/${studentId}`)
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
    const data: IReport[] = response?.data;
    return data;
};

const getReportById = async (reportId: number) => {
    const response = await $api.get(`${API_URL}/reports/${reportId}`).catch(e => {
        if (!e.response) {
            toast.error('Connection error', toastConfig);
        } else {
            toast.error(getErrorMsg(e as any), toastConfig);
        }
    });

    return response?.data as IReport;
};

const createReport = async (values: any) => {
    const response = await $api
        .post(`${API_URL}/reports`, {
            ...values,
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

const updateReport = async (reportId: number, values: any) => {
    const response = await $api
        .patch(`${API_URL}/reports/${reportId}`, {
            ...values,
        })
        .then(data => {
            if (data.status == 200 || data.status == 204 || data.status == 201) {
                toast.success('Успешно обновлено!', toastConfig);
            }

            return data;
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        });

    return response?.data;
};

const deleteReport = async (reportId: number) => {
    const response = await $api
        .delete(`${API_URL}/reports/${reportId}`)
        .then(data => {
            if (data.status == 200 || data.status == 204 || data.status == 201) {
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

const ReportService = { createReport, getReportsByStudentId, getReports, deleteReport, getReportById, updateReport };

export default ReportService;
