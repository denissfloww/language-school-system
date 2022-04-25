import CostGridToolbar from './CostGridToolbar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { TableCell } from '@mui/material';
import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCostAction, fetchCostsAction, selectCostsState, setPage, setRowsPerPage } from '../../../redux/reducers/cost/costReducer';
import { useEffect } from 'react';
import { ICost } from '../../../interfaces/ICost';
import UpdateCostButton from './Buttons/UpdateCostButton';
import DeleteButton from '../../../components/Buttons/DeleteButton';
import TableBodySkeleton from '../../../components/Skeletons/TableBodySkeleton';
import TablePagination from '@mui/material/TablePagination';
import NumberFormat from 'react-number-format';

const CostGrid = () => {
    const headerRows: { text: string; align: 'left' | 'center' | 'right' }[] = [
        {
            text: 'Код',
            align: 'left',
        },
        {
            text: 'Название',
            align: 'center',
        },
        {
            text: 'Стоимость одного занятия',
            align: 'center',
        },
        {
            text: 'Описание',
            align: 'center',
        },
        {
            text: 'Действия',
            align: 'right',
        },
    ];

    const dispatch = useDispatch();
    const { isLoading, costsData, page, rowsPerPage } = useSelector(selectCostsState);

    const fetchCostsData = () => {
        dispatch(fetchCostsAction(page, rowsPerPage));
    };

    useEffect(() => {
        fetchCostsData();
    }, [page, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setPage(newPage));
        fetchCostsData();
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
        dispatch(setPage(0));
        fetchCostsData();
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <CostGridToolbar />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1000 }} aria-labelledby='tableTitle' size='medium'>
                            <TableHead>
                                <TableRow>
                                    {headerRows.map(value => (
                                        <>
                                            <TableCell align={value.align}>
                                                <b>{value.text}</b>
                                            </TableCell>
                                        </>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!isLoading && costsData ? (
                                    <>
                                        {costsData.data.length ? (
                                            <>
                                                {costsData.data.map((cost: ICost) => (
                                                    <>
                                                        <TableRow key={cost.id}>
                                                            <TableCell component='th' scope='row' align='left'>
                                                                {cost.id}
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='center'>
                                                                {cost.name}
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='center'>
                                                                {/*{cost.lessonPrice}*/}
                                                                <NumberFormat
                                                                    value={cost.lessonPrice}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    suffix='₽'
                                                                />
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='center'>
                                                                {cost.description}
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='right'>
                                                                <UpdateCostButton cost={cost} />
                                                                <DeleteButton
                                                                    id={cost.id}
                                                                    title='Удалить язык?'
                                                                    confirmationText='Вы действительно хотите удалить язык? Удалятся все группы с данным языком'
                                                                    onDeleteMethod={() => {
                                                                        dispatch(deleteCostAction(cost.id));
                                                                    }}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                ))}
                                            </>
                                        ) : (
                                            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                <TableCell key={4} component='th' scope='row' align='center'>
                                                    Отсутствуют данные
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </>
                                ) : (
                                    <TableBodySkeleton columnsCount={headerRows.length} />
                                )}
                            </TableBody>
                        </Table>
                        {costsData ? (
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component='div'
                                count={costsData?.meta.itemCount}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        ) : null}
                    </TableContainer>
                </Paper>
            </Box>
        </>
    );
};

export default CostGrid;
