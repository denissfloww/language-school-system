import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { TableCell } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, selectStudentsState } from '../../../redux/reducers/students/studentsReducer';
import { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { IStudent } from '../../../interfaces/IStudent';
import moment from 'moment';

const StudentsGrid = () => {
    const dispatch = useDispatch();
    const headerRows: { text: string; align: 'left' | 'center' | 'right' }[] = [
        {
            text: '',
            align: 'left',
        },
        {
            text: 'Код',
            align: 'left',
        },
        {
            text: 'ФИО',
            align: 'center',
        },
        {
            text: 'ФИО Родителя',
            align: 'center',
        },
        {
            text: 'Контактный телефон родителя',
            align: 'center',
        },
        {
            text: 'Email родителя',
            align: 'center',
        },
    ];
    const { students } = useSelector(selectStudentsState);
    const fetchStudentsData = () => {
        dispatch(fetchStudents());
    };

    useEffect(() => {
        fetchStudentsData();
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
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
                            {students?.map(student => (
                                <>
                                    <StudentGroupRow student={student} />
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

const StudentGroupRow = (props: { student: IStudent }) => {
    const [open, setOpen] = React.useState(false);
    const { student } = props;
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton size='small' onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component='th' scope='row' align='left'>
                    {student.id}
                </TableCell>
                <TableCell component='th' scope='row' align='center'>
                    {student.firstName} {student.middleName} {student.lastName}
                </TableCell>
                <TableCell component='th' scope='row' align='center'>
                    {student.parentName} {student.parentMiddleName} {student.parentLastName}
                </TableCell>
                <TableCell component='th' scope='row' align='center'>
                    <NumberFormat value={student.parentPhone} displayType={'text'} format='+ 7 (###) ### ##-##' />
                </TableCell>
                <TableCell component='th' scope='row' align='center'>
                    {student.parentEmail}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant='h6' gutterBottom component='div'>
                                Группы
                            </Typography>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Код группы</TableCell>
                                        <TableCell>Название группы</TableCell>
                                        <TableCell align='right'>Следующий месяц оплаты</TableCell>
                                        <TableCell align='right'>Сумма оплаты на следующий месяц</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {student?.groupsPayment?.map(groupPayment => (
                                        <>
                                            <TableRow key={student.id}>
                                                <TableCell component='th' scope='row'>
                                                    {groupPayment.groupId}
                                                </TableCell>
                                                <TableCell>{groupPayment.groupName}</TableCell>
                                                <TableCell align='right' sx={{ fontWeight:'bold' }}>
                                                    {moment().locale('ru').month(groupPayment.price.calculateMonth).format('MMMM')}
                                                </TableCell>
                                                <TableCell align='right' sx={{ color: '#a61e1e', fontWeight:'bold' }}>
                                                    <NumberFormat
                                                        value={groupPayment.price.priceNextMonth}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix='₽'
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    ))}
                                    {/*{students?.map(student => (*/}
                                    {/*    <TableRow key={student.id}>*/}
                                    {/*        <TableCell component='th' scope='row'>*/}
                                    {/*            {student.firstName} {student.middleName} {student.lastName}*/}
                                    {/*        </TableCell>*/}
                                    {/*        <TableCell>{student.parentName}</TableCell>*/}
                                    {/*        <TableCell align='right'>{student.parentEmail}</TableCell>*/}
                                    {/*        <TableCell align='right'>*/}
                                    {/*            <NumberFormat*/}
                                    {/*                value={student.parentPhone}*/}
                                    {/*                displayType={'text'}*/}
                                    {/*                format='+ 7 (###) ### ##-##'*/}
                                    {/*            />*/}
                                    {/*        </TableCell>*/}
                                    {/*    </TableRow>*/}
                                    {/*))}*/}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default StudentsGrid;
