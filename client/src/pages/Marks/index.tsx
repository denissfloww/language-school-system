import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';

interface IMark {
    fullName: string;
    presence: boolean;
}

const rows: IMark[] = [
    {
        fullName: 'Иванов Б.С',
        presence: true,
    },
    {
        fullName: 'Иванов Б.С',
        presence: true,
    },
    {
        fullName: 'Иванов Б.С',
        presence: true,
    },
    {
        fullName: 'Иванов Б.С',
        presence: true,
    },
];

const Marks = () => {
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Оценки</title>
            </Helmet>
            <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                <Box
                    component='main'
                    sx={{
                        backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
                        flexGrow: 1,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3} justifyContent='center'>
                            <Grid item xs={12} md={4} lg={6}>
                                <TableContainer component={Paper}>
                                    <Table aria-label='simple table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography variant='h6'></Typography>
                                                </TableCell>
                                                <TableCell align='right'>
                                                    <Button variant='outlined' startIcon={<CheckIcon />}>
                                                        Отметить всех
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography variant='subtitle1'><b>Ф.И.О.</b></Typography>
                                                </TableCell>
                                                <TableCell align='right'>
                                                  <Typography variant='subtitle1'><b>Присутствие</b></Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map(row => (
                                                <TableRow key={row.fullName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell component='th' scope='row'>
                                                        {row.fullName}
                                                    </TableCell>
                                                    <TableCell align='right'>
                                                        <FormControl>
                                                            <Select id='demo-simple-select' label='Age'>
                                                                <MenuItem value={10}>П</MenuItem>
                                                                <MenuItem value={20}>Н</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                    {/*<TableCell align='right'>{row.presence ? 'П' : 'Н'}</TableCell>*/}
                                                </TableRow>
                                            ))}
                                            <TableRow key='last'>
                                                <TableCell component='th' scope='row'></TableCell>
                                                <TableCell align='right'>
                                                    <Button variant='outlined' startIcon={<SaveIcon />}>Сохранить</Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Container>
        </>
    );
};

export default Marks;
