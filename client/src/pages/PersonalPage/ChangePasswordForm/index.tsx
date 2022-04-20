import { Formik, Form } from 'formik';
import formModel from './FormModel/formModel';
import Grid from '@mui/material/Grid';
import InputField from '../../../components/FormFields/InputField';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import validationSchema from './FormModel/validationSchema';
import { useDispatch } from 'react-redux';
import { changePasswordAction } from '../../../redux/reducers/users/usersReducer';

const { formId, formField } = formModel;
const formInitialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

const ChangePasswordForm = () => {
    const { oldPassword, newPassword, confirmNewPassword } = formField;
    const theme = useTheme();
    const dispatch = useDispatch();
    function _handleSubmit(values: any, actions: any) {
        dispatch(changePasswordAction(values));
        actions.setSubmitting(false);
        actions.resetForm({
            values: formInitialValues,
        });
    }

    return (
        <>
            <Formik initialValues={formInitialValues} validationSchema={validationSchema} onSubmit={_handleSubmit}>
                {props => (
                    <Form id={formId}>
                        <Grid container spacing={3} style={{ textAlign: 'center' }}>
                            <Grid item xs={12} md={12}>
                                <InputField name={oldPassword.name} label={oldPassword.label} fullWidth type='password' />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <InputField name={newPassword.name} label={newPassword.label} fullWidth type='password' />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <InputField name={confirmNewPassword.name} label={confirmNewPassword.label} fullWidth type='password' />
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

export default ChangePasswordForm;
