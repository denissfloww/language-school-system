import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import DashboardPage from '../../../components/Pages/DashboardPage';
import { useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import StudentReportForm from './Form';

const StudentReport = () => {
    const { studentId } = useParams();

    return (
        <>
            <DashboardPage title='Добавление отчета об успеваемости'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Новый отчет по успеваемости
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
                        <StudentReportForm studentId={Number(studentId)} />
                    </Box>
                </Paper>
            </DashboardPage>
        </>
    );
};

export default StudentReport;
