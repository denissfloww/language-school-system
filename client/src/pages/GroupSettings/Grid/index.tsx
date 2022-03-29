import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import { TableCell } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups, selectGroupsState } from '../../../redux/reducers/groups/groupsReducer';
import { useEffect } from 'react';
import { IGroup } from '../../../interfaces/IGroup';
import GroupGridToolbar from './GroupGridToolbar';
import DeleteButton from './Buttons/DeleteButton';
import UpdateGroupButton from './Buttons/UpdateGroupButton';
import TablePagination from '@mui/material/TablePagination';
import * as React from 'react';
import TableBodySkeleton from '../../../components/Skeletons/TableBodySkeleton';

const GroupGrid = () => {
    const dispatch = useDispatch();
    const { groupsData } = useSelector(selectGroupsState);

    const fetchGroupsData = () => {
        console.log(page + 1, rowsPerPage);
        dispatch(fetchGroups(page + 1, rowsPerPage));
    };

    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);

    useEffect(() => {
        fetchGroupsData();
    }, [page, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        fetchGroupsData();
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        fetchGroupsData();
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
            text: 'Учитель',
            align: 'center',
        },
        {
            text: 'Количество',
            align: 'center',
        },
        {
            text: 'Описание',
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
                    <>
                        <GroupGridToolbar />
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
                                    {groupsData ? (
                                        <>
                                            {groupsData.data.length? (
                                                <>
                                                    {groupsData.data.map((group: IGroup) => (
                                                        <TableRow key={group.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                            <TableCell component='th' scope='row'>
                                                                {group.id}
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='center'>
                                                                {group.name}
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='center'>
                                                                {group.teacher.firstName}
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='center'>
                                                                {group.name}
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='center'>
                                                                {group.desc}
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='right'>
                                                                <UpdateGroupButton groupId={group.id} />
                                                                <DeleteButton groupId={group.id} />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </>

                                            ) : (
                                                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                    <TableCell  key={4} component='th' scope='row' align='center'>
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
                            {groupsData ? (
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15]}
                                    component='div'
                                    count={groupsData?.meta.itemCount}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            ) : null}
                        </TableContainer>
                    </>
                </Paper>
            </Box>
        </>
    );
};

export default GroupGrid;
