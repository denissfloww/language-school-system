import { Formik, Form } from 'formik';
import formModel from './FormModel/formModel';
import Button from '@mui/material/Button';
import * as React from 'react';
import { TextField, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputField from '../../../components/FormFields/InputField';
import { RoleTypes } from '../../../interfaces/IRole';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, updateUserData } from '../../../redux/reducers/auth/authReducer';
import Typography from '@mui/material/Typography';
import PhoneMask from '../../../components/InputMasks/PhoneMask';
import { useEffect } from 'react';
import { selectProfileState, setUserInfoValidation } from '../../../redux/reducers/profile/profileReducer';
import { getValidationUserInfoForm } from './FormModel/validationSchema';
import { fetchCurrentUserInfoByIdAction, selectUsersState } from '../../../redux/reducers/users/usersReducer';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import UsersService from '../../../services/UsersService';

const { formId, formField } = formModel;

const UserInfoForm = () => {
    const {
        lastName,
        firstName,
        middleName,
        birthDate,
        parentPhone,
        email,
        phone,
        parentName,
        parentMiddleName,
        parentLastName,
        parentEmail,
    } = formField;
    const theme = useTheme();
    const dispatch = useDispatch();

    const { user } = useSelector(selectAuthState);
    const { user: editedUserInfo } = useSelector(selectUsersState);
    const { validationSchema } = useSelector(selectProfileState);
    const isStudent = user?.roles?.some(role => role.name == RoleTypes.Student);
    useEffect(() => {
        dispatch(fetchCurrentUserInfoByIdAction());
        dispatch(setUserInfoValidation(getValidationUserInfoForm(Boolean(isStudent))));
    }, [isStudent, user]);

    function _handleSubmit(values: any, actions: any) {
        console.log(values);
        if (user) {
            UsersService.updateUser(user.id, values).then(res => {
                actions.setSubmitting(false);
                dispatch(updateUserData());
            });
        }
    }

    return (
        <>
            {editedUserInfo ? (
                <Formik
                    initialValues={{
                        firstName: editedUserInfo.firstName,
                        lastName: editedUserInfo.lastName,
                        middleName: editedUserInfo.middleName,
                        phone: editedUserInfo.phone,
                        email: editedUserInfo.email,
                        birthDate: editedUserInfo.birthDate,
                        parentName: editedUserInfo.student?.parentName,
                        parentMiddleName: editedUserInfo.student?.parentMiddleName,
                        parentLastName: editedUserInfo.student?.parentLastName,
                        parentEmail: editedUserInfo.student?.parentEmail,
                        parentPhone: editedUserInfo.student?.parentPhone,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={_handleSubmit}
                >
                    {props => (
                        <Form id={formId}>
                            <Grid container spacing={3} style={{ textAlign: 'center' }}>
                                <Grid item xs={12} md={6}>
                                    <InputField variant='outlined' name={lastName.name} label={lastName.label} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField name={firstName.name} label={firstName.label} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField name={middleName.name} label={middleName.label} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            onChange={(value: any) => {
                                                console.log(props);
                                                props.setFieldValue('birthDate', value);
                                            }}
                                            inputFormat='dd.MM.yyyy'
                                            value={props.values.birthDate}
                                            renderInput={(params: any) => (
                                                <TextField
                                                    {...params}
                                                    name={birthDate.name}
                                                    label={birthDate.label}
                                                    error={!!props.errors.birthDate && props.touched.birthDate}
                                                    helperText={props.errors.birthDate}
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                {isStudent ? (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <InputField name={parentName.name} label={parentName.label} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputField name={parentMiddleName.name} label={parentMiddleName.label} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputField name={parentLastName.name} label={parentLastName.label} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputField name={parentEmail.name} label={parentEmail.label} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='subtitle1' gutterBottom>
                                                {parentPhone.label}
                                            </Typography>
                                            <InputField
                                                name={parentPhone.name}
                                                InputProps={{
                                                    inputComponent: PhoneMask as any,
                                                }}
                                            />
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <InputField name={email.name} label={email.label} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputField
                                                fullWidth
                                                name={phone.name}
                                                InputProps={{
                                                    inputComponent: PhoneMask as any,
                                                }}
                                            />
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    disabled={props.isSubmitting}
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    sx={{ marginTop: theme.spacing(3), marginLeft: theme.spacing(1) }}
                                >
                                    Изменить
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : null}
        </>
    );
};

export default UserInfoForm;
