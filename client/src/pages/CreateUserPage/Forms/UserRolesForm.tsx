import Typography from '@mui/material/Typography';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import SelectField from '../../../components/FormFields/SelectField';

const cities = [
    {
        value: undefined,
        label: 'None',
    },
    {
        value: '1',
        label: 'New York',
    },
    {
        value: '2',
        label: 'Chicago',
    },
    {
        value: '3',
        label: 'Saigon',
    },
];

interface IProps {
    formField?: any;
}

const UserRolesForm = (props: IProps) => {
    const {
        formField: { role },
    } = props;

    return (
        <React.Fragment>
            <Typography variant='h6' gutterBottom>
                Назначение роли
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <SelectField name={role.name} label={role.label} data={cities} fullWidth />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default UserRolesForm;
