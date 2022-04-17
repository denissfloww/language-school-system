import Grid from '@mui/material/Grid';
import InputField from '../../../components/FormFields/InputField';
import * as React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';

interface IProps {
    formField?: any;
    formikProps: any;
}

export const UserInformationForm = (props: IProps) => {
    const {
        formField: { firstName, middleName, lastName, birthDate },
        formikProps,
    } = props;

    return (
        <React.Fragment>
            <Grid container spacing={3} style={{ textAlign: 'center' }}>
                <Grid item xs={12} md={6}>
                    <InputField name={lastName.name} label={lastName.label} fullWidth />
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
                                console.log(formikProps)
                                formikProps.setFieldValue('birthDate', value)}
                            }
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
            </Grid>
        </React.Fragment>
    );
};

export default UserInformationForm;
