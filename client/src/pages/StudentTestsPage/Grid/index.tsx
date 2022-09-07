import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentTestsService from '../../../services/StudentTestsService';
import { ITest } from '../../../interfaces/ITest';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteButton from '../../../components/Buttons/DeleteButton';

const TestsGrid = () => {
    const dispatch = useDispatch();
    const [selectedRows, setSelectedRows] = useState([]);
    const [tests, setTests] = useState<ITest[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();
    const changePage = (page: number) => {
        setPage(page);
        loadTests(page, rowsPerPage);
    };

    const changeRowsPerPage = (rowsPerPage: number) => {
        setRowsPerPage(rowsPerPage);
        loadTests(page, rowsPerPage);
    };

    const loadTests = (page?: number, rowsPerPage?: number) => {
        const data = StudentTestsService.getStudentTests().then(data => {
            setLoading(true);
            const rows: ITest[] = [];
            data.data.forEach((t: ITest) => {
                rows.push({
                    id: t.id,
                    name: t.name,
                    description: t.description,
                    points: t.points,
                });
            });

            setTests(rows);
            setTotal(data.total);
            setLoading(false);
        });
    };

    const deleteTest = (testId: number) => {
        StudentTestsService.deleteTest(testId).then(() => {
            loadTests(page, rowsPerPage);
        });
    };

    useEffect(() => {
        loadTests(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const columns = [
        {
            label: 'Название',
            name: 'name',
            options: { filterOptions: { fullWidth: true } },
        },
        {
            label: 'Описание',
            name: 'description',
            options: { filterOptions: { fullWidth: true } },
        },
        {
            label: 'Баллы',
            name: 'points',
            options: { filterOptions: { fullWidth: true } },
        },
        {
            name: 'Действия',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex: number, rowIndex: number) => {
                    const test = tests[dataIndex];

                    return (
                        <>
                            <Tooltip title='Изменить'>
                                <IconButton size='small' to={`/dashboard/tests/update/${test.id}`} component={Link}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Удалить'>
                                <IconButton size='small'>
                                    <DeleteButton
                                        id={test.id}
                                        confirmationText='Вы действительно хотите удалить тест? Все связанные отчёты также будут удалены!'
                                        title='Удалить тест?'
                                        onDeleteMethod={() => {
                                            deleteTest(test.id);
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </>
                    );
                },
            },
        },
    ];

    const options: any = {
        search: true,
        download: true,
        print: false,
        viewColumns: true,
        filter: true,
        count: total,
        selectableRows: false,
        filterType: 'dropdown',
        tableBodyHeight: '100%',
        rowsSelected: selectedRows,
        onTableChange: (action: any, state: any) => {
            if (action === 'changePage') {
                changePage(state.page);
            }
            if (action === 'changeRowsPerPage') {
                changeRowsPerPage(state.rowsPerPage);
            }
        },
        onRowsDelete: (rowsDeleted: any, newData: any) => {
            setSelectedRows([]);
        },
        onRowSelectionChange: (rowsSelectedData: any, allRows: any, rowsSelected: any) => {
            setSelectedRows(rowsSelected);
        },
        customToolbar: () => {
            return (
                <Tooltip title='Добавить'>
                    <IconButton style={{ order: -1 }} to={`/dashboard/tests/create`} component={Link}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            );
        },
    };

    return <MUIDataTable title={'Список тестов'} data={tests} columns={columns} options={options} />;
};

export default TestsGrid;
