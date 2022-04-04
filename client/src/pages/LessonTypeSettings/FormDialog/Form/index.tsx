import Grid from '@mui/material/Grid';
import InputField from '../../../../components/FormFields/InputField';
import * as React from 'react';
import { Button, TextField } from '@mui/material';
import { SketchPicker } from 'react-color';
import { Field } from 'formik';
import Typography from '@mui/material/Typography';

interface ILessonTypeFormProps {
    formField?: any;
}

const LessonTypeForm = (props: ILessonTypeFormProps) => {
    const {
        formField: { name, description, id, color },
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
                <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
                    <Typography>
                        Цвет ячейки в расписании: <Field style={{cursor:'pointer'}} name={color.name} type='color' />
                    </Typography>
                </Grid>
            </Grid>
            <TextField name={id.name} type='hidden' style={{ display: 'none' }} />
        </>
    );
};

export default LessonTypeForm;
