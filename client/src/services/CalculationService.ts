import { RequestQueryBuilder } from '@nestjsx/crud-request';
import $api from './http';
import { API_URL } from '../constants/urls';
import { INewPageDataResponse } from './responses/types';
import { ICalculatedPayment } from '../interfaces/ICalculatedPayment';

const getCalculatedPaymentsHistory = async (studentId: number, groupId: number) => {
    const qb = RequestQueryBuilder.create();
    qb.search({
        $and: [
            {
                studentId: studentId,
            },
            {
                groupId: groupId,
            },
        ],
    });

    const response = await $api.get(`${API_URL}/calculated-payments?${qb.query()}`).then(data => {
        return data;
    });

    const data: INewPageDataResponse<ICalculatedPayment> = response?.data;
    return data;
};

const CalculationService = {
    getCalculatedPaymentsHistory,
};

export default CalculationService;
