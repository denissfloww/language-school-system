import { Formik, Form } from 'formik';
import formModel from './FormModel/formModel';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputField from '../../../components/FormFields/InputField';
import { RoleTypes } from '../../../interfaces/IRole';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../../redux/reducers/auth/authReducer';

const { formId, formField } = formModel;

const UserInfoForm = () => {
    const { lastName, firstName, middleName, age } = formField;
    const theme = useTheme();
    function _handleSubmit(values: any, actions: any) {
        console.log(values);
    }

    const { user } = useSelector(selectAuthState);

    const formInitialValues = {};

    const isStudent = user?.roles?.some(role => role.name == RoleTypes.Student);
    return (
        <>
            <Formik initialValues={formInitialValues} onSubmit={_handleSubmit}>
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
                                <InputField
                                    name={age.name}
                                    label={age.label}
                                    fullWidth
                                    type='number'
                                    InputProps={{ inputProps: { min: 0, max: 200 } }}
                                />
                            </Grid>
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
        </>
    );
};

export default UserInfoForm;
