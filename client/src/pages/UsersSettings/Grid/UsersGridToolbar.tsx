import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const UsersGridToolbar = () => {
    return (
        <>
            <Toolbar>
                <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
                    Пользователи
                </Typography>
            </Toolbar>
        </>
    );
};

export default UsersGridToolbar;
