import Typography from '@mui/material/Typography';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, selectRolesState } from '../../../redux/reducers/roles/rolesReducer';
import { useEffect } from 'react';
import { Field } from 'formik';
import AutocompleteField from '../../../components/FormFields/AutocompleteField';

const UserRolesForm = (props: { formField?: any }) => {
    const dispatch = useDispatch();
    const {
        formField: { role },
    } = props;

    const { roles } = useSelector(selectRolesState);
    useEffect(() => {
        dispatch(fetchRoles());
    }, []);

    const rolesDisplayValues = roles.map(role => {
        return { label: role.label, value: role.name };
    });

    return (
        <React.Fragment>
            <Typography variant='h6' gutterBottom>
                Назначение роли
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    {/*<SelectField name={role.name} label={role.label} data={cities} fullWidth />*/}
                    <Field
                        margin='dense'
                        name={role.name}
                        component={AutocompleteField}
                        options={rolesDisplayValues}
                        getOptionLabel={(option: any) => option.label}
                        // getOptionSelected={(option: any, value: any) => option.value === value.value}
                        textFieldProps={{
                            fullWidth: true,
                            margin: 'normal',
                            variant: 'outlined',
                            label: role.label,
                        }}
                        multiple
                        required
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default UserRolesForm;
