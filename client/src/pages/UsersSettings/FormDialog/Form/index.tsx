import Grid from '@mui/material/Grid';
import InputField from '../../../../components/FormFields/InputField';
import { TextField } from '@mui/material';
import * as React from 'react';

interface IUserFormProps {
    formField?: any;
}

const UserForm = (props: IUserFormProps) => {
    const {
        formField: { firstName, middleName, lastName, id },
    } = props;

    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <InputField margin='dense' name={firstName.name} label={firstName.label} fullWidth />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <InputField margin='dense' name={middleName.name} label={middleName.label} fullWidth />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <InputField margin='dense' name={lastName.name} label={lastName.label} fullWidth />
                </Grid>
            </Grid>
            <TextField name={id.name} type='hidden' style={{ display: 'none' }} />
        </>
    );
};

export default UserForm;
