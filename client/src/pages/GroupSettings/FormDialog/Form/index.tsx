import * as React from 'react';
import Grid from '@mui/material/Grid';
import InputField from '../../../../components/FormFields/InputField';
import AutocompleteField from '../../../../components/FormFields/AutocompleteField';
import { Field } from 'formik';
import { useEffect } from 'react';
import { fetchFormData, selectGroupsState } from '../../../../redux/reducers/groups/groupsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import SelectField from '../../../../components/FormFields/SelectField';

interface IGroupFormProps {
    formField?: any;
}

const GroupForm = (props: IGroupFormProps) => {
    const {
        formField: { name, desc, students, id, teacher },
    } = props;

    const dispatch = useDispatch();
    const { studentsAutocompleteValues, teachersValues } = useSelector(selectGroupsState);

    useEffect(() => {
        dispatch(fetchFormData());
        console.log(teachersValues);
    }, []);

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
                        options={studentsAutocompleteValues}
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
                <Grid item xs={12} sm={12}>
                  <SelectField name={teacher.name} label={teacher.label} data={teachersValues} fullWidth />
                </Grid>
            </Grid>
            <TextField name={id.name} type='hidden' style={{ display: 'none' }} />
        </>
    );
};

export default GroupForm;
