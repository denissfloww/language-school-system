import Typography from '@mui/material/Typography';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import InputField from '../../../components/FormFields/InputField';
import PhoneMask from '../../../components/InputMasks/PhoneMask';
import { useFormikContext } from 'formik';
import { RoleTypes } from '../../../interfaces/IRole';

const ContactInformation = (props: { formField?: any }) => {
    const {
        formField: { phone, parentPhone, parentName, parentMiddleName, parentLastName, parentEmail, email },
    } = props;

    const {
        values: { roles },
    } = useFormikContext();
    const isStudent = roles.some((value: { label: string; value: string }) => {
        return value.value == RoleTypes.Student;
    });

    if (isStudent) {
        return (
            <>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <InputField name={parentName.name} label={parentName.label} fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputField name={parentMiddleName.name} label={parentMiddleName.label} fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputField name={parentLastName.name} label={parentLastName.label} fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputField name={parentEmail.name} label={parentEmail.label} fullWidth />
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
                        <Typography variant='subtitle1' gutterBottom>
                            Номер телефона родителя
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
    }
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

export default ContactInformation;
