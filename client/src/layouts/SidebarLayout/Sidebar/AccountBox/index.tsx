import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../../../utils/helperFunc';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../../../redux/reducers/auth/authReducer';
import { IRole, RoleTypes, RoleTypesDisplay } from '../../../../interfaces/IUser';

const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    padding: theme.spacing(2, 2.5),
    margin: theme.spacing(2, 2.0),
    borderRadius: '10px',
    backgroundColor: theme.palette.grey[200],
}));

const AccountBox = () => {
    const { user } = useSelector(selectAuthState);
    return (
        <AccountStyle>
            <Avatar {...stringAvatar(`${user?.firstName} ${user?.lastName}`, 40)} />
            <Box sx={{ ml: 2 }}>
                <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                    {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {/*{user?.roles?.map((role: IRole) => {*/}
                    {/*    return RoleTypesDisplay[role.name];*/}
                    {/*})}*/}
                    {user?.roles? (
                      RoleTypesDisplay[user.roles[0].name]
                    ) : (
                      RoleTypesDisplay[RoleTypes.None]
                    )}
                </Typography>
            </Box>
        </AccountStyle>
    );
};

export default AccountBox;
