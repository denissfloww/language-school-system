import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useTheme } from '@mui/material';
import DashboardPage from '../../../components/Pages/DashboardPage';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import UpdateUserForm from './Form';
import UpdatePasswordForm from './UpdatePasswordForm';

const UpdateUserPage = () => {
    const { id } = useParams();
    const theme = useTheme();
    console.log(id);
    return (
        <>
            <DashboardPage title='Изменение пользователя'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Изменение пользователя
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
                    <UpdateUserForm />
                </Paper>

                <Typography variant='h4' sx={{ mb: 6, mt: 5 }}>
                    Форма изменения пароля
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
                    <UpdatePasswordForm />
                </Paper>
            </DashboardPage>
        </>
    );
};

export default UpdateUserPage;
