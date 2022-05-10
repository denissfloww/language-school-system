import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import NumberFormat from 'react-number-format';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserStudentGroupsAction, selectProfileState } from '../../../../redux/reducers/profile/profileReducer';
import TableBodySkeleton from '../../../../components/Skeletons/TableBodySkeleton';
import { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ru';

const StudentGroupInfoTable = () => {
    const { isGridLoading, studentGroups } = useSelector(selectProfileState);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserStudentGroupsAction());
    }, []);
    const headerRows: { text: string; align: 'left' | 'center' | 'right' }[] = [
        {
            text: 'Код',
            align: 'left',
        },
        {
            text: 'Название',
            align: 'left',
        },
        {
            text: 'Учитель',
            align: 'left',
        },
        {
            text: 'Контактный телефон учителя',
            align: 'left',
        },
        {
            text: 'Сумма к оплате',
            align: 'left',
        },
        {
            text: 'Месяц оплаты',
            align: 'left',
        },
    ];

    return (
        <>
            <Typography variant='h6'>Мои группы</Typography>
            <TableContainer component={Paper}>
                <Table aria-label='simple table'>
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
                        {!isGridLoading ? (
                            <>
                                {studentGroups.length ? (
                                    <>
                                        {studentGroups.map(group => (
                                            <>
                                                {' '}
                                                <TableRow>
                                                    <TableCell>{group.id}</TableCell>
                                                    <TableCell>{group.name}</TableCell>
                                                    <TableCell>
                                                        {group.teacher.lastName} {group.teacher.middleName} {group.teacher.firstName}
                                                    </TableCell>
                                                    <TableCell>
                                                        <NumberFormat
                                                            value={group.teacher.phone}
                                                            displayType={'text'}
                                                            format='+ 7 (###) ### ##-##'
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <NumberFormat
                                                            value={group.priceNextMonth}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix='₽'
                                                        />
                                                    </TableCell>
                                                    <TableCell>{moment().locale('ru').month(group.month).format('MMMM')}</TableCell>
                                                </TableRow>
                                            </>
                                        ))}
                                    </>
                                ) : null}
                            </>
                        ) : (
                            <TableBodySkeleton columnsCount={headerRows.length} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default StudentGroupInfoTable;
