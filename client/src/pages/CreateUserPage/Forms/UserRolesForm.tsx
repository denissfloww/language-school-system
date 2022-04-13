import Typography from '@mui/material/Typography';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, selectRolesState } from '../../../redux/reducers/roles/rolesReducer';
import { useEffect } from 'react';
import { Field, useFormikContext } from 'formik';
import AutocompleteField from '../../../components/FormFields/AutocompleteField';
import SelectField from '../../../components/FormFields/SelectField';

const UserRolesForm = (props: { formField?: any }) => {
    const dispatch = useDispatch();
    const {
        formField: { role },
    } = props;

    const { roles: rolesFill } = useSelector(selectRolesState);
    useEffect(() => {
        dispatch(fetchRoles());
    }, []);

    const rolesDisplayValues = rolesFill.map(role => {
        return { label: role.label, value: role.name };
    });

    return (
        <React.Fragment>
            <Typography variant='h6' gutterBottom>
                Назначение роли
            </Typography>
            <Grid container spacing={3} justifyContent='center'>
                <Grid item xs={12} md={6}>
                    <SelectField name={role.name} label={role.label} data={rolesDisplayValues} fullWidth />
                    {/*<Field*/}
                    {/*    margin='dense'*/}
                    {/*    name={role.name}*/}
                    {/*    component={AutocompleteField}*/}
                    {/*    options={rolesDisplayValues}*/}
                    {/*    getOptionLabel={(option: any) => option.label}*/}
                    {/*    textFieldProps={{*/}
                    {/*        fullWidth: true,*/}
                    {/*        margin: 'normal',*/}
                    {/*        variant: 'outlined',*/}
                    {/*        label: role.label,*/}
                    {/*    }}*/}
                    {/*    multiple*/}
                    {/*    required*/}
                    {/*    fullwidth*/}
                    {/*/>*/}
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default UserRolesForm;
