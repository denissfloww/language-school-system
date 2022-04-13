import Typography from '@mui/material/Typography';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import InputField from '../../../components/FormFields/InputField';
import PhoneMask from '../../../components/InputMasks/PhoneMask';

const CommonContactInformation = (props: { formField?: any }) => {
    const {
        formField: { phone, email },
    } = props;

    return (
        <>
            <Grid container spacing={3} justifyContent='center' style={{ textAlign: 'center' }}>
                <Grid item xs={12} md={12}>
                    <Typography variant='h6' gutterBottom>
                        Контакнтная информация
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField name={email.name} label={email.label} fullWidth />
                </Grid>
                <Grid item xs={12} md={12}>
                    <InputField
                        name={phone.name}
                        InputProps={{
                            inputComponent: PhoneMask as any,
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default CommonContactInformation;
