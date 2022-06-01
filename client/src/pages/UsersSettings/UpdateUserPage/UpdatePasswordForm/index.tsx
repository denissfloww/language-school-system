import { Grid, useTheme } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import InputField from '../../../../components/FormFields/InputField';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

const UpdatePasswordForm = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    function _handleSubmit(values: any, actions: any) {
        console.log('бан');
    }

    return (
        <Formik onSubmit={_handleSubmit} initialValues={{}} validateOnChange>
            {(formikProps: any) => (
                <>
                    <Form id='updateUserPassword'>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <InputField name='newPassword' label='Новый пароль' fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    disabled={formikProps.isSubmitting}
                                    type='submit'
                                    variant='contained'
                                    color='primary'

                                >
                                    Изменить
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                </>
            )}
        </Formik>
    );
};

export default UpdatePasswordForm;
