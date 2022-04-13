import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../../../utils/helperFunc';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../../../redux/reducers/auth/authReducer';
import {IRole, RoleTypes, RoleTypesDisplay} from "../../../../interfaces/IRole";

const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    padding: theme.spacing(2, 1.5),
    margin: theme.spacing(2, 1.0),
    borderRadius: '10px',
    backgroundColor: theme.palette.grey[200],
    overflowWrap: 'break-word'
}));

const AccountBox = () => {
    const { user } = useSelector(selectAuthState);
    const userRolesString = (roles: IRole[]) => {
        const roleNames: string[] = [];

        roles.forEach((role) => {
            roleNames.push(RoleTypesDisplay[role.name])
        })

        return roleNames.join(', ');
    }
    return (
        <AccountStyle>
            {user? (
                <>
                    <Avatar {...stringAvatar(`${user?.firstName} ${user?.lastName}`, 40)} />
                    <Box sx={{ ml: 2 }}>
                        <Typography variant='subtitle2' sx={{ color: 'text.primary', overflowWrap: 'break-word' }}>
                            {user?.firstName} {user?.lastName}
                        </Typography>
                        <Typography variant='body2' sx={{ color: 'text.secondary', overflowWrap: 'break-word' }}>
                            {user.roles.length? (
                                <>
                                    {userRolesString(user.roles)}
                                </>

                            ) : (
                                RoleTypesDisplay[RoleTypes.None]
                            )}

                        </Typography>
                    </Box>
                </>
            ) : null}

        </AccountStyle>
    );
};

export default AccountBox;
