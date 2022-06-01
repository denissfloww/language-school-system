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
import { IUser } from '../../../interfaces/IUser';
import UpdateUserButton from './Buttons/UpdateButton';
import TableBodySkeleton from '../../../components/Skeletons/TableBodySkeleton';
import DeleteButton from '../../../components/Buttons/DeleteButton';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

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
                        <Table sx={{ minWidth: 1000 }} size='medium'>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Код</TableCell>
                                    <TableCell align='center'>Имя</TableCell>
                                    <TableCell align='center'>Отчество</TableCell>
                                    <TableCell align='center'>Фамилия</TableCell>
                                    <TableCell align='center'>Роли</TableCell>
                                    <TableCell align='right'>Действия</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users ? (
                                    <>
                                        {users.data.length ? (
                                            <>
                                                {users.data?.map((user: IUser) => (
                                                    <TableRow key={user.id}>
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
                                                            {user.roles.map(role => (
                                                                <>{role.label} </>
                                                            ))}
                                                            {/*{RoleTypesDisplay[user.role]}*/}
                                                        </TableCell>
                                                        <TableCell component='th' scope='row' align='right'>
                                                            <IconButton to={`/dashboard/settings/users/update/${user.id}`} component={Link}>
                                                                <EditIcon />
                                                            </IconButton>
                                                            <DeleteButton
                                                                id={user.id}
                                                                confirmationText='Вы действительно хотите удалить пользователя?'
                                                                title='Удалить пользователя?'
                                                                onDeleteMethod={() => {
                                                                    console.log('делете');
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
                                    <TableBodySkeleton columnsCount={7} />
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>
    );
};

export default UsersGrid;
