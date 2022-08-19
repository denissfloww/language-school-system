import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import DashboardPage from '../../../components/Pages/DashboardPage';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import StudentReportForm from './Form';

const StudentReport = () => {
    const { studentId, reportId } = useParams();
    return (
        <>
            <DashboardPage title={reportId ? 'Изменение отчёта об успеваемости' : 'Добавление отчета об успеваемости'}>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    {reportId ? 'Изменение отчёта об успеваемости' : 'Добавление отчета об успеваемости'}
                </Typography>

                <Paper
                    sx={{
                        flexGrow: 1,
                        height: '100%',
                        padding: 4,
                        overflow: 'auto',
                        width: '100%',
                        mb: 2,
                    }}
                >
                    <Box>
                        <StudentReportForm studentId={Number(studentId)} reportId={reportId ? Number(reportId) : undefined} />
                    </Box>
                </Paper>
            </DashboardPage>
        </>
    );
};

export default StudentReport;
