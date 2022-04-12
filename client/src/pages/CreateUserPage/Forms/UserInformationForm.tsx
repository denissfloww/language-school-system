import Grid from '@mui/material/Grid';
import InputField from '../../../components/FormFields/InputField';
import * as React from 'react';

interface IProps {
    formField?: any;
}

export const UserInformationForm = (props: IProps) => {
    const {
        formField: { firstName, middleName, lastName, age },
    } = props;

    return (
        <React.Fragment>
            <Grid container spacing={3} style={{ textAlign: 'center' }}>
                <Grid item xs={12} md={12}>
                    <InputField name={firstName.name} label={firstName.label} sx={{ width: '50%' }} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <InputField name={middleName.name} label={middleName.label} sx={{ width: '50%' }} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <InputField name={lastName.name} label={lastName.label} sx={{ width: '50%' }} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <InputField
                        name={age.name}
                        label={age.label}
                        sx={{ width: '50%' }}
                        type='number'
                        InputProps={{ inputProps: { min: 0, max: 200 } }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default UserInformationForm;
