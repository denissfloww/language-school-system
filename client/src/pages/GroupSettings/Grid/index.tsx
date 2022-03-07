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
import TablePagination from "@mui/material/TablePagination";
import * as React from "react";

const GroupGrid = () => {
    const dispatch = useDispatch();
    const { groups } = useSelector(selectGroupsState);

    useEffect(() => {
        dispatch(fetchGroups());
    }, []);

    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(event)
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
    };

    const [page, setPage] = React.useState(0);

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <GroupGridToolbar />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1000 }} aria-labelledby='tableTitle' size='medium'>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Код</TableCell>
                                    <TableCell align='center'>Название</TableCell>
                                    <TableCell align='center'>Количество</TableCell>
                                    <TableCell align='center'>Описание</TableCell>
                                    <TableCell align='right'>Действия</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {groups.map((group: IGroup) => (
                                    <TableRow key={group.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                                        <TableCell component='th' scope='row'>
                                            {group.id}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center'>
                                            {group.name}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center'>{group.name}</TableCell>
                                        <TableCell component='th' scope='row' align='center'>{group.desc}</TableCell>
                                        <TableCell component='th' scope='row' align='right'>
                                            <UpdateGroupButton groupId={group.id} />
                                            <DeleteButton groupId={group.id} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component='div'
                          count={groups.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>

                </Paper>
            </Box>
        </>
    );
};

export default GroupGrid;
