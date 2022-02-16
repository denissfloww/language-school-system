import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../../../helpers/helperFunc';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { styled } from "@mui/material/styles";

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
    return (
        <AccountStyle>
            <Avatar {...stringAvatar('Тестовый тест', 40)} />
            <Box sx={{ ml: 2 }}>
                <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                    Тестовый тест
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    Администратор
                </Typography>
            </Box>
        </AccountStyle>
    );
};

export default AccountBox;
