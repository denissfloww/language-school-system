import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddButton from './Buttons/AddButton';

const GroupGridToolbar = () => {
    return (
        <>
            <Toolbar>
                <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
                    Учебные группы
                </Typography>
                <AddButton />
            </Toolbar>
        </>
    );
};

export default GroupGridToolbar;
