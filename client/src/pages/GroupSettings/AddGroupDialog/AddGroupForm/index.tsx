import * as React from 'react';
import Grid from '@mui/material/Grid';
import InputField from '../../../../components/FormFields/InputField';
import AutocompleteField from '../../../../components/FormFields/AutocompleteField';
import { Field } from 'formik';

interface IAddGroupFormProps {
    formField?: any;
}

const AddGroupForm = (props: IAddGroupFormProps) => {
    const {
        formField: { name, desc, students },
    } = props;

    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <InputField margin='dense' name={name.name} label={name.label} fullWidth />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <InputField margin='dense' multiline maxRows={4} name={desc.name} label={desc.label} fullWidth />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Field
                        margin='dense'
                        name={students.name}
                        component={AutocompleteField}
                        options={skills}
                        groupBy={(option: any) => option.label[0]}
                        textFieldProps={{
                            fullWidth: true,
                            margin: 'normal',
                            variant: 'outlined',
                            label: students.label,
                        }}
                        multiple
                    />
                </Grid>
            </Grid>
        </>
    );
};

const skills = [
    {
        label: 'Бугаков Денис',
        value: '1',
    },
    {
        label: 'Петров Петр',
        value: '2',
    },
    {
        label: 'Иванов Иван',
        value: '3',
    },
    {
        label: 'Сидоров Сидр',
        value: '4',
    },
    {
        label: 'Пивной пиво',
        value: '5',
    },
    {
        label: 'Хороший Петр',
        value: '6',
    },
];

export default AddGroupForm;
