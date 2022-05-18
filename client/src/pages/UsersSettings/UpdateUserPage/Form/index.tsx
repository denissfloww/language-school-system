import { Grid, TextField, useTheme } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import InputField from '../../../../components/FormFields/InputField';
import * as React from 'react';
import formModel from '../../../CreateUserPage/FormModel/formModel';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from '@mui/material/Button';
import AutocompleteField from '../../../../components/FormFields/AutocompleteField';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, selectRolesState } from '../../../../redux/reducers/roles/rolesReducer';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import PhoneMask from '../../../../components/InputMasks/PhoneMask';

const { formId, formField } = formModel;
const UpdateUserForm = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { firstName, middleName, lastName, birthDate, role, parentPhone, parentName, parentMiddleName, parentLastName, parentEmail } =
        formField;
    function _handleSubmit(values: any, actions: any) {
        console.log('бан');
    }

    const { roles: rolesFill } = useSelector(selectRolesState);
    useEffect(() => {
        dispatch(fetchRoles());
    }, []);

    const rolesDisplayValues = rolesFill.map(role => {
        return { label: role.label, value: role.name };
    });
    return (
        <>
            <Formik onSubmit={_handleSubmit} initialValues={{}} validateOnChange>
                {(formikProps: any) => (
                    <>
                        <Form id={formId}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <InputField margin='dense' name={firstName.name} label={firstName.label} fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputField margin='dense' name={middleName.name} label={middleName.label} fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputField margin='dense' name={lastName.name} label={lastName.label} fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            onChange={(value: any) => {
                                                console.log(formikProps);
                                                formikProps.setFieldValue('birthDate', value);
                                            }}
                                            inputFormat='dd.MM.yyyy'
                                            value={formikProps.values.birthDate}
                                            renderInput={(params: any) => (
                                                <TextField
                                                    {...params}
                                                    name={birthDate.name}
                                                    label={birthDate.label}
                                                    error={!!formikProps.errors.birthDate && formikProps.touched.birthDate}
                                                    helperText={formikProps.errors.birthDate}
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        margin='dense'
                                        name={role.name}
                                        component={AutocompleteField}
                                        options={rolesDisplayValues}
                                        getOptionLabel={(option: any) => option.label}
                                        textFieldProps={{
                                            fullWidth: true,
                                            margin: 'normal',
                                            variant: 'outlined',
                                            label: role.label,
                                        }}
                                        multiple
                                        required
                                        fullwidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                                    <InputField name={parentLastName.name} label={parentLastName.label} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField name={parentName.name} label={parentName.label} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField name={parentMiddleName.name} label={parentMiddleName.label} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField name={parentEmail.name} label={parentEmail.label} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
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
                                <Grid item xs={12} sm={12}>
                                    <Button
                                        disabled={formikProps.isSubmitting}
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                        sx={{ marginTop: theme.spacing(3), marginLeft: theme.spacing(1) }}
                                    >
                                        Изменить
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </>
                )}
            </Formik>
        </>
    );
};

export default UpdateUserForm;
