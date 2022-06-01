import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTestsState, setTests } from '../../../redux/reducers/tests/testsReducer';
import StudentTestsService from '../../../services/StudentTestsService';
import { ITest } from '../../../interfaces/ITest';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const TestsGrid = () => {
    const dispatch = useDispatch();
    const [selectedRows, setSelectedRows] = useState([]);
    const { tests } = useSelector(selectTestsState);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const changePage = (page: number) => {
        setPage(page);
        // loadTests(page, rowsPerPage);
    };

    const changeRowsPerPage = (rowsPerPage: number) => {
        setRowsPerPage(rowsPerPage);
        // loadTests(page, rowsPerPage);
    };

    const loadTests = (page?: number, rowsPerPage?: number) => {
        const data = StudentTestsService.getStudentTests(Number(page) + 1, rowsPerPage).then(data => {
            const rows: ITest[] = [];
            data.data.forEach((t: ITest) => {
                rows.push({
                    id: t.id,
                    name: t.name,
                    description: t.description,
                    points: t.points,
                });
            });

            console.log(rows);
            dispatch(setTests(rows));
            setTotal(data.total);
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
                                    <DeleteIcon />
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
        rowsPerPage: rowsPerPage,
        count: total,
        filterType: 'dropdown',
        tableBodyHeight: '100%',
        rowsSelected: selectedRows,
        onTableChange: (action: any, state: any) => {
            // console.log(action);
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
