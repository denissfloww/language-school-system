import Grid from '@mui/material/Grid';
import InputField from '../../../../components/FormFields/InputField';
import { TextField } from '@mui/material';
import * as React from 'react';

interface ICostFormProps {
    formField?: any;
}

const CostForm = (props: ICostFormProps) => {
    const {
        formField: { name, description, id, lessonPrice },
    } = props;

    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <InputField margin='dense' name={name.name} label={name.label} fullWidth />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <InputField margin='dense' maxRows={4} name={lessonPrice.name} label={lessonPrice.label} fullWidth />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <InputField margin='dense' multiline maxRows={4} name={description.name} label={description.label} fullWidth />
                </Grid>
            </Grid>
            <TextField name={id.name} type='hidden' style={{ display: 'none' }} />
        </>
    );
};

export default CostForm;
