import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { stringAvatar, stringToColor } from '../../../utils/helperFunc';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { IRole, RoleTypesDisplay } from '../../../interfaces/IRole';

const UserInfoHeader = (props: { firstName: string; lastName: string; roles: IRole[] }) => {
    const { firstName, lastName, roles } = props;
    const color = stringToColor(`${firstName} ${lastName}`, '30', '90');
    const userRolesString = (roles: IRole[]) => {
        const roleNames: string[] = [];
        roles.forEach(role => {
            roleNames.push(RoleTypesDisplay[role.name]);
        });
        return roleNames.join(', ');
    };
    return (
        <Paper sx={{ width: '100%', mb: 2, height: '17vh', borderRadius: '10px' }}>
            <Grid
                container
                sx={{
                    height: '80%',
                    borderRadius: '10px 10px 0px 0px',
                    background: color,
                    opacity: '0.6',
                }}
            >
                <Grid item md={2}>
                    <Avatar
                        {...stringAvatar(`${firstName} ${lastName}`, 105)}
                        style={{ margin: '0 auto', marginTop: '16%', border: '2px solid white' }}
                    />
                </Grid>
                <Grid item md={3}>
                    <>
                        <Typography variant='h6' component='div' sx={{ margin: '0 auto', marginTop: '20%', fontWeight: 'bold' }}>
                            {`${firstName} ${lastName}`}
                        </Typography>
                        <Typography variant='subtitle1' sx={{ color: 'text.secondary', overflowWrap: 'break-word' }}>
                            {userRolesString(roles)}
                        </Typography>
                    </>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserInfoHeader;
