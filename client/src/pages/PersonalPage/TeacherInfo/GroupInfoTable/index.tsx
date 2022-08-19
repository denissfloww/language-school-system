import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HistoryIcon from '@mui/icons-material/History';
import Collapse from '@mui/material/Collapse';
import * as React from 'react';
import Box from '@mui/material/Box';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTeacherGroupsAction, selectProfileState } from '../../../../redux/reducers/profile/profileReducer';
import { useEffect } from 'react';
import { IGroup } from '../../../../interfaces/IGroup';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';

const TeacherGroupInfoTable = () => {
    const { isGridLoading, teacherGroups } = useSelector(selectProfileState);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserTeacherGroupsAction());
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
    ];

    return (
        <>
            <Typography variant='h6'>Мои группы</Typography>
            <TableContainer component={Paper}>
                <Table aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell />
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
                        {' '}
                        {teacherGroups.map(row => (
                            <>
                                <GroupRow row={row} />
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

function GroupRow(props: { row: IGroup }) {
    const [open, setOpen] = React.useState(false);
    const { name, id, students } = props.row;
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TableCell>
                    <IconButton size='small' onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>
                    {id}
                </TableCell>
                <TableCell component='th' scope='row'>
                    {name}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant='h6' gutterBottom component='div'>
                                Ученики
                            </Typography>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ФИО</TableCell>
                                        <TableCell>ФИО родителя</TableCell>
                                        <TableCell align='right'>Email родителя</TableCell>
                                        <TableCell align='right'>Контактный телефон родителя</TableCell>
                                        <TableCell align='right'>Действия</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students?.map(student => (
                                        <TableRow key={student.id}>
                                            <TableCell component='th' scope='row'>
                                                {student.firstName} {student.middleName} {student.lastName}
                                            </TableCell>
                                            <TableCell>
                                                {student.parentName} {student.parentMiddleName} {student.lastName}
                                            </TableCell>
                                            <TableCell align='right'>{student.parentEmail}</TableCell>
                                            <TableCell align='right'>
                                                <NumberFormat
                                                    value={student.parentPhone}
                                                    displayType={'text'}
                                                    format='+ 7 (###) ### ##-##'
                                                />
                                            </TableCell>
                                            <TableCell align='right'>
                                                <Tooltip title='Просмотреть историю расчётов'>
                                                    <IconButton
                                                        to={`/dashboard/calculations/history/student/${student.id}/group/${id}`}
                                                        component={Link}
                                                    >
                                                        <HistoryIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default TeacherGroupInfoTable;
