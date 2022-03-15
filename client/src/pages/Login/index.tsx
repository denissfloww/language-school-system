import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Helmet } from 'react-helmet';
import { APP_NAME } from '../../settings';
import formModel from './FormModel/formModel';
import { Field, Form, Formik } from 'formik';
import InputField from '../../components/FormFields/InputField';
import validationSchema from './FormModel/validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, selectAuthState } from '../../redux/reducers/auth/authReducer';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Navigate } from 'react-router-dom';

const sectionStyle = {
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
};

const { formId, formField } = formModel;

const Login = () => {
    const dispatch = useDispatch();
    const initialValues = {
        login: '',
        password: '',
        isRemember: true,
    };

    const { error, user } = useSelector(selectAuthState);

    if (user) {
        return (
            <Navigate
                to={{
                    pathname: '/',
                }}
            />
        );
    }

    function _handleSubmit(values: any, actions: any) {
        console.log(values);
        const creditionals = {
            login: values.login,
            password: values.password,
            isRemember: values.isRemember,
        };
        dispatch(loginAction(creditionals));

        // toast('Default Notification !');
        // console.log(values);
        // console.log(AuthService.login(values.login, values.password));
    }

    const { login, password, isRemember } = formField;
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Авторизация - {APP_NAME}</title>
            </Helmet>
            <Grid style={sectionStyle} container>
                <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Авторизация
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <Formik
                                onSubmit={_handleSubmit}
                                validateOnChange
                                validationSchema={validationSchema}
                                initialValues={initialValues}
                            >
                                {({ isSubmitting }) => (
                                    <Form id={formId}>
                                        <InputField margin='normal' name={login.name} label={login.label} required fullWidth />
                                        <InputField
                                            margin='normal'
                                            name={password.name}
                                            label={password.label}
                                            required
                                            fullWidth
                                            type='password'
                                            id='password'
                                            autoComplete='current-password'
                                        />
                                        <FormControlLabel
                                            control={
                                                <Field
                                                    color='primary'
                                                    value='three'
                                                    type='checkbox'
                                                    component={Checkbox}
                                                    name={isRemember.name}
                                                />
                                            }
                                            label={isRemember.label}
                                        />
                                        {error ? (
                                            <Alert severity='error'>
                                                <AlertTitle>Ошибка</AlertTitle>
                                                {error}
                                            </Alert>
                                        ) : null}
                                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                                            Войти
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </>
    );
};

export default Login;
