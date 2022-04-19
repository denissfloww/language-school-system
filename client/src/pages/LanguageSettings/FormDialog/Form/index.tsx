import Grid from '@mui/material/Grid';
import InputField from '../../../../components/FormFields/InputField';
import * as React from 'react';
import { TextField } from '@mui/material';

interface ILanguageFormProps {
    formField?: any;
}

const LanguageForm = (props: ILanguageFormProps) => {
    const {
        formField: { name, description, id },
    } = props;

    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <InputField margin='dense' name={name.name} label={name.label} fullWidth />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <InputField margin='dense' multiline maxRows={4} name={description.name} label={description.label} fullWidth />
                </Grid>
            </Grid>
            <TextField name={id.name} type='hidden' style={{ display: 'none' }} />
        </>
    );
};

export default LanguageForm;
