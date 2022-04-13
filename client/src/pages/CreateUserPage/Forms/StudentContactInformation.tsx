import Typography from '@mui/material/Typography';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import InputField from '../../../components/FormFields/InputField';
import PhoneMask from '../../../components/InputMasks/PhoneMask';

const StudentContactInformation = (props: { formField?: any }) => {
    const {
        formField: { parentPhone, parentName, parentMiddleName, parentLastName, parentEmail },
    } = props;

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
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
            </Grid>
        </>
    );
};

export default StudentContactInformation;
