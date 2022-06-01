import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DashboardPage from '../../../components/Pages/DashboardPage';
import * as React from 'react';
import TestForm from '../Form';

const CreateTestPage = () => {
    return (
        <>
            <DashboardPage title='Добавление теста'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Новый тест
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
                        <TestForm />
                    </Box>
                </Paper>
            </DashboardPage>
        </>
    );
};

export default CreateTestPage;
