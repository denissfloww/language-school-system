import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import CalculationService from '../../../services/CalculationService';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { ICalculatedPayment } from '../../../interfaces/ICalculatedPayment';

interface IPaymentsHistoryGridRow {
    id: number;
    calculationMonth: number;
    paymentSum: number;
    calculationDate: Date;
}

const StudentCalculatedPaymentsGrid = (props: { studentId: number; groupId: number }) => {
    const { studentId, groupId } = props;
    const [selectedRows, setSelectedRows] = useState([]);
    const [rows, setRows] = useState<IPaymentsHistoryGridRow[]>([]);
    const [payments, setPayments] = useState<ICalculatedPayment[]>([]);
    const loadHistory = () => {
        const data = CalculationService.getCalculatedPaymentsHistory(studentId, groupId).then(data => {
            const rows: IPaymentsHistoryGridRow[] = [];
            data.data.forEach(p => {
                rows.push({
                    id: p.id,
                    paymentSum: p.paymentSum,
                    calculationMonth: p.calculationMonth,
                    calculationDate: p.calculationDate,
                });
            });
            setPayments(data.data);
            setRows(rows);
        });
    };

    useEffect(() => {
        loadHistory();
    }, []);

    const options: any = {
        search: true,
        download: true,
        print: false,
        viewColumns: true,
        filter: true,
        filterType: 'dropdown',
        tableBodyHeight: '100%',
        selectableRows: false,
        rowsSelected: selectedRows,
    };

    const columns: MUIDataTableColumnDef[] = [
        {
            label: 'Месяц оплаты',
            name: 'calculationMonth',
            options: {
                filterOptions: { fullWidth: true },
                customBodyRenderLite: (dataIndex: number, rowIndex: number) => {
                    const payment = rows[dataIndex];
                    return <>{moment().locale('ru').month(payment.calculationMonth).subtract(1, 'month').format('MMMM')}</>;
                },
            },
        },
        {
            label: 'Дата расчёта',
            name: 'calculationDate',
            options: {
                filterOptions: { fullWidth: true },
                customBodyRenderLite: (dataIndex: number, rowIndex: number) => {
                    const payment = rows[dataIndex];
                    return <>{moment(payment.calculationDate).format('DD.MM.YYYY')}</>;
                },
            },
        },
        {
            label: 'Сумма',
            name: 'paymentSum',
            options: {
                filterType: 'textField',
                customBodyRenderLite: (dataIndex: number, rowIndex: number) => {
                    const payment = rows[dataIndex];
                    return (
                        <>
                            <NumberFormat value={payment.paymentSum} displayType={'text'} thousandSeparator={true} suffix='₽' />
                        </>
                    );
                },
            },
        },
    ];

    return (
        <>
            {payments.length ? (
                <MUIDataTable
                    title={`${payments[0].student.user.lastName} ${payments[0].student.user.firstName}, ${payments[0].group.name}`}
                    data={rows}
                    columns={columns}
                    options={options}
                />
            ) : (
                <MUIDataTable
                    title={'Нет данных'}
                    data={[]}
                    columns={columns}
                    options={options}
                />
            )}
        </>
    );
};

export default StudentCalculatedPaymentsGrid;
