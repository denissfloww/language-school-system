import * as React from 'react';
import DashboardPage from '../../../components/Pages/DashboardPage';
import Typography from '@mui/material/Typography';
import FeedForm from './Form';
import { useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';

const CreateFeedPage = () => {
    const theme = useTheme();
    return (
        <>
            <DashboardPage title='Добавление объявления'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Добавление объявления
                </Typography>
                <Paper
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        flexGrow: 1,
                        height: '100%',
                        padding: 4,
                        overflow: 'auto',
                    }}
                >
                    <FeedForm />
                </Paper>
            </DashboardPage>
        </>
    );
};

export default CreateFeedPage;
