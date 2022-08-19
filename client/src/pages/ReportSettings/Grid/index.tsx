import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import ReportService from '../../../services/ReportService';
import moment from 'moment';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteButton from '../../../components/Buttons/DeleteButton';

interface IReportsGridRow {
    id: number;
    reportDate: string;
    testPoints?: number;
    testScored?: number;
    description: string;
    groupName: string;
    studentId: number;
    studentName: string;
    testName: string;
}

const ReportsGrid = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [reports, setReports] = useState<IReportsGridRow[]>([]);

    const loadReports = () => {
        const data = ReportService.getReports().then(data => {
            const rows: IReportsGridRow[] = [];
            data.data.forEach(r => {
                rows.push({
                    description: r.description,
                    groupName: r.group.name,
                    studentName: `${r.student.user.firstName} ${r.student.user.middleName} ${r.student.user.lastName}`,
                    studentId: r.student.id,
                    testName: r.test?.name ?? '',
                    id: r.id,
                    reportDate: r.reportDate,
                    testPoints: r.test?.points,
                    testScored: r.testScored,
                });
            });
            setReports(rows);
        });
    };

    useEffect(() => {
        loadReports();
    }, []);

    const deleteReport = (reportId: number) => {
        ReportService.deleteReport(reportId).then(() => {
            loadReports();
        });
    };

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
            label: 'Ученик',
            name: 'studentName',
            options: { filterOptions: { fullWidth: true } },
        },
        {
            label: 'Группа',
            name: 'groupName',
            options: { filterOptions: { fullWidth: true } },
        },
        {
            label: 'Тест',
            name: 'testName',
            options: {
                filterType: 'textField',
            },
        },
        {
            label: 'Описание',
            name: 'description',
            options: {
                filterType: 'textField',
            },
        },
        {
            label: 'Баллы за тест',
            name: 'testPoints',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex: number, rowIndex: number) => {
                    const report = reports[dataIndex];
                    return (
                        <>
                            {report.testPoints || report.testScored ? (
                                <>
                                    {report.testScored}/{report.testPoints}
                                </>
                            ) : null}
                        </>
                    );
                },
            },
        },
        {
            label: 'Дата',
            name: 'reportDate',
            options: {
                filterOptions: { fullWidth: true },
                customBodyRenderLite: (dataIndex: number, rowIndex: number) => {
                    const report = reports[dataIndex];
                    return <>{moment.utc(report.reportDate).format('DD.MM.YYYY')}</>;
                },
            },
        },
        {
            name: 'Действия',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex: number, rowIndex: number) => {
                    const report = reports[dataIndex];

                    return (
                        <>
                            <Tooltip title='Изменить'>
                                <IconButton size='small' to={`/dashboard/reports/${report.studentId}/update/${report.id}`} component={Link}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Удалить'>
                                <DeleteButton
                                    id={report.id}
                                    confirmationText='Вы действительно хотите удалить отчёт?'
                                    title='Удалить отчёт?'
                                    onDeleteMethod={() => {
                                        deleteReport(report.id);
                                    }}
                                />
                            </Tooltip>
                        </>
                    );
                },
            },
        },
    ];

    return <MUIDataTable title={'Список отчётов'} data={reports} columns={columns} options={options} />;
};

export default ReportsGrid;
