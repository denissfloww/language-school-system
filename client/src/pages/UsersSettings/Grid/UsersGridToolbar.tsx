import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';
import { Link as RouterLink } from 'react-router-dom';

const UsersGridToolbar = () => {
    return (
        <>
            <Toolbar>
                <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
                    Пользователи
                </Typography>
                <Tooltip title='Добавить пользователя'>
                    <IconButton component={RouterLink}
                                to='/dashboard/settings/user/create'>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </>
    );
};

export default UsersGridToolbar;
