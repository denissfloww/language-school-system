import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputField from '../../../components/FormFields/InputField';
import * as React from 'react';

interface IProps {
    formField?: any;
}

export const UserInformationForm = (props: IProps) => {
    const {
        formField: { firstName, middleName, lastName },
    } = props;

    return (
        <React.Fragment>
            <Typography variant='h6' gutterBottom>
                Информация о пользователе
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <InputField name={firstName.name} label={firstName.label} fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField name={middleName.name} label={middleName.label} fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField name={lastName.name} label={lastName.label} fullWidth />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default UserInformationForm;
