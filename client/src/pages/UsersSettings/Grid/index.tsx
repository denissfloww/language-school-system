import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import UsersGridToolbar from './UsersGridToolbar';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableCell } from '@mui/material';
import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUsersState } from '../../../redux/reducers/users/usersReducer';
import { IUser, RoleTypesDisplay } from '../../../interfaces/IUser';
import DeleteGroupButton from './Buttons/DeleteGroupButton';
import UpdateUserButton from './Buttons/UpdateButton';

const UsersGrid = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(selectUsersState);
    useEffect(() => {
        dispatch(fetchUsers());
    }, []);
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <UsersGridToolbar />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1000 }} aria-labelledby='tableTitle' size='medium'>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Код</TableCell>
                                    <TableCell align='center'>Имя</TableCell>
                                    <TableCell align='center'>Фамилия</TableCell>
                                    <TableCell align='center'>Отчество</TableCell>
                                    <TableCell align='center'>Роль</TableCell>
                                    <TableCell align='right'>Действия</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user: IUser) => (
                                    <TableRow key={user.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                                        <TableCell component='th' scope='row' align='left'>
                                            {user.id}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center'>
                                            {user.firstName}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center'>
                                            {user.middleName}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center'>
                                            {user.lastName}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center'>
                                            {RoleTypesDisplay[user.role]}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='right'>
                                            <DeleteGroupButton userId={user.id} />
                                            <UpdateUserButton userId={user.id} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>
    );
};

export default UsersGrid;
