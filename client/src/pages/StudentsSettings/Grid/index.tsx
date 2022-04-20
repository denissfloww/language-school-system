import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { TableCell } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';

const StudentsGrid = () => {
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
            text: 'Сумма задолжности на май',
            align: 'center',
        },
        {
            text: 'Действия',
            align: 'right',
        },
    ];

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
                            <TableRow key={1}>
                                <TableCell component='th' scope='row' align='left'>
                                    1
                                </TableCell>
                                <TableCell component='th' scope='row' align='center'>
                                    Админ Админский
                                </TableCell>
                                <TableCell component='th' scope='row' align='center'>
                                    Родитель Админ Админский
                                </TableCell>
                                <TableCell component='th' scope='row' align='center'>
                                    +79199283415
                                </TableCell>
                                <TableCell component='th' scope='row' align='center'>
                                   denb@mail.ru
                                </TableCell>
                                <TableCell component='th' scope='row' align='center'>
                                    5000 руб
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default StudentsGrid;
