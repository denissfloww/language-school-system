import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { TableCell } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import * as React from 'react';
import Table from '@mui/material/Table';
import LessonTypeGridToolbar from './LessonTypeGridToolbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonTypes, selectLessonTypesState, setPage, setRowsPerPage } from '../../../redux/reducers/lessonTypes/lessonTypesReducer';
import TableBody from '@mui/material/TableBody';
import TableBodySkeleton from '../../../components/Skeletons/TableBodySkeleton';
import { ILessonType } from '../../../interfaces/ILessonType';
import { useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';
import DeleteButton from '../../../components/Buttons/DeleteButton';
import { deleteGroup, fetchGroups } from '../../../redux/reducers/groups/groupsReducer';

const LessonTypeGrid = () => {
    const dispatch = useDispatch();
    const { isLoading, lessonTypesData, page, rowsPerPage } = useSelector(selectLessonTypesState);

    const fetchLessonTypesData = () => {
        dispatch(fetchLessonTypes(page, rowsPerPage));
    };

    useEffect(() => {
        fetchLessonTypesData();
    }, [page, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setPage(newPage));
        fetchLessonTypesData();
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
        dispatch(setPage(0));

        fetchLessonTypesData();
    };

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
            text: 'Описание',
            align: 'center',
        },
        {
            text: 'Цвет',
            align: 'center',
        },
        {
            text: 'Действия',
            align: 'center',
        },
    ];

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <LessonTypeGridToolbar />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1000 }} aria-labelledby='tableTitle' size='medium'>
                            <TableHead>
                                <TableRow>
                                    {headerRows.map(value => (
                                        <>
                                            <TableCell align={value.align}>{value.text}</TableCell>
                                        </>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!isLoading && lessonTypesData ? (
                                    <>
                                        {lessonTypesData.data.length ? (
                                            <>
                                                {lessonTypesData.data.map((lessonType: ILessonType) => (
                                                    <TableRow key={lessonType.id}>
                                                        <TableCell component='th' scope='row' align='left'>
                                                            {lessonType.id}
                                                        </TableCell>
                                                        <TableCell component='th' scope='row' align='center'>
                                                            {lessonType.name}
                                                        </TableCell>
                                                        <TableCell component='th' scope='row' align='center'>
                                                            {lessonType.description}
                                                        </TableCell>
                                                        <TableCell component='th' scope='row' align='center'>
                                                            {lessonType.color}
                                                        </TableCell>
                                                        <TableCell component='th' scope='row' align='right'>
                                                            {/*<UpdateGroupButton group={group} />*/}
                                                            <DeleteButton
                                                                id={lessonType.id}
                                                                title='Удалить тип занятия?'
                                                                onDeleteMethod={() => {
                                                                    console.log(lessonType.id);
                                                                }}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
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
                        {lessonTypesData ? (
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component='div'
                                count={lessonTypesData?.meta.itemCount}
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

export default LessonTypeGrid;
