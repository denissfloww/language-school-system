import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import ReportService from '../../../../services/ReportService';
import { IReport } from '../../../../interfaces/IReport';
import moment from 'moment';

const StudentReports = (props: { studentId: number }) => {
    const [reports, setReports] = useState<IReport[]>([]);
    const { studentId } = props;
    useEffect(() => {
        console.log(studentId);
        ReportService.getReportsByStudentId(studentId).then(r => {
            setReports(r);
        });
    }, []);

    return (
        <>
            <Grid container item spacing={3}>
                <Grid item sm={12}>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>
                        Отчёты по успеваемости
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Дата отчёта</TableCell>
                                    <TableCell align='left'>Группа</TableCell>
                                    <TableCell align='left'>Тест</TableCell>
                                    <TableCell align='left'>Результат теста</TableCell>
                                    <TableCell align='left'>Описание</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reports.length !== 0 ? (
                                    <>
                                        {reports.map(r => (
                                            <>
                                                <TableRow>
                                                    <TableCell>
                                                        <Typography style={{ fontSize: '14pt' }}>
                                                            {moment.utc(r.reportDate).format('DD.MM.YYYY')}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align='left'>
                                                        <Typography style={{ fontSize: '14pt' }}>{r.group.name}</Typography>
                                                    </TableCell>
                                                    <TableCell align='left'>
                                                        <Typography style={{ fontSize: '14pt' }}>{r.test?.name}</Typography>
                                                    </TableCell>
                                                    <TableCell align='left'>
                                                        <Typography style={{ fontSize: '14pt' }}>
                                                            {r.testScored || r.test?.points ? (
                                                                <>
                                                                    {r.testScored}/{r.test?.points}
                                                                </>
                                                            ) : null}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align='left'>
                                                        <Typography style={{ fontSize: '14pt' }}>{r.description}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        ))}
                                    </>
                                ) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
};

export default StudentReports;
