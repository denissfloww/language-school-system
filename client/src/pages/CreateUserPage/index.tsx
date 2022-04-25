import CreateUserForm from './CreateUserForm';
import { Helmet } from 'react-helmet';
import { APP_NAME } from '../../settings';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Box, useTheme } from '@mui/material';
import DashboardPage from '../../components/Pages/DashboardPage';
import Paper from '@mui/material/Paper';

const CreateUserPage = () => {
    const theme = useTheme();
    return (
        <>
            <DashboardPage title='Новый пользователь'>
                <Typography variant='h4' sx={{ mb: 4 }}>
                    Добавление нового пользователя
                </Typography>
                <Container maxWidth='lg' sx={{ mb: 4 }}>
                    <Paper
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            flexGrow: 1,
                            height: '100%',
                            padding: 4,
                            overflow: 'auto',
                        }}
                    >
                        <CreateUserForm />
                    </Paper>
                </Container>
            </DashboardPage>
        </>
    );
};

export default CreateUserPage;
