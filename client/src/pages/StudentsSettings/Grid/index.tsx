import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { TableCell, Tooltip } from '@mui/material';
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
import AssessmentIcon from '@mui/icons-material/Assessment';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { IStudent } from '../../../interfaces/IStudent';
import moment from 'moment';
import TableBodySkeleton from '../../../components/Skeletons/TableBodySkeleton';
import { Link } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';

const StudentsGrid = () => {
    const dispatch = useDispatch();
    const headerRows: { text: string; align: 'left' | 'center' | 'right' }[] = [
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
        {
            text: '',
            align: 'center',
        },
        {
            text: '',
            align: 'center',
        },
    ];
    const { students, isStudentsLoading } = useSelector(selectStudentsState);
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
                            {!isStudentsLoading && students ? (
                                <>
                                    {students.length ? (
                                        <>
                                            {students?.map(student => (
                                                <>
                                                    <StudentGroupRow student={student} />
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
                <TableCell component='th' scope='row'>
                    <Tooltip title='Открыть список групп'>
                        <IconButton size='small' onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell component='th' scope='row'>
                    <Tooltip title='Новый отчет по успеваемости'>
                        <IconButton size='small' to={`/dashboard/reports/${student.id}/add`} component={Link}>
                            <AssessmentIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none' }} colSpan={6}>
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
                                        <TableCell align='right'>Действия</TableCell>
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
                                                {groupPayment.price ? (
                                                    <>
                                                        <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                                                            {moment()
                                                                .locale('ru')
                                                                .month(groupPayment.price.calculateMonth)
                                                                .subtract(1, 'month')
                                                                .format('MMMM')}
                                                        </TableCell>
                                                        <TableCell align='right' sx={{ color: '#a61e1e', fontWeight: 'bold' }}>
                                                            <NumberFormat
                                                                value={groupPayment.price.priceNextMonth}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix='₽'
                                                            />
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            <Tooltip title='Просмотреть историю расчётов'>
                                                                <IconButton
                                                                    to={`/dashboard/calculations/history/student/${student.id}/group/${groupPayment.groupId}`}
                                                                    component={Link}
                                                                >
                                                                    <HistoryIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </>
                                                ) : null}
                                            </TableRow>
                                        </>
                                    ))}
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
