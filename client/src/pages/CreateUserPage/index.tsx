import CreateUserForm from './CreateUserForm';
import { Helmet } from 'react-helmet';
import { APP_NAME } from '../../settings';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Box, useTheme } from '@mui/material';

const CreateUserPage = () => {
    const theme = useTheme();
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Новый пользователь - {APP_NAME}</title>
            </Helmet>
            <Toolbar />
            <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                <Typography variant='h4' sx={{ mb: 4 }}>
                    Добавление нового пользователя
                </Typography>
                <Box
                    component='main'
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        flexGrow: 1,
                        height: '100%',
                        padding: 4,
                        overflow: 'auto',
                    }}
                >
                    <CreateUserForm />
                </Box>
            </Container>
        </>
    );
};

export default CreateUserPage;
